/**
 * @file This file contains functions for making API requests to cinzia-server.
 * @module cinzia-sdk
 */

import fetchApi from './helpers/fetch';

// QUESTIONS:
// questa sdk verrà usata da applicativi frontend? In tal caso, come abilitiamo cors su cinzia-server? CORS ABILITATO *
// il token è utilizzabile una sola volta, ma non ha scadenza? METTERE EXPIREAT
// chat vuole un chatId, ma come fa il client a recuperarlo? FARE NUOVO ENDPOINT IN CINZIA-SERVER CHE NON PRENDA CHATID, MA UNA CHAT INTERA
// Del modello Chat su cinzia-server in Prisma, prendi messages (solo time, role, content) e modelId (se non lo passi, usi cinzia normale)
// poi usa standardModel o dynamicContext in base al valore di modelId

// chat vuole uno userId, ma come fa il client a recuperarlo? (LO PRENDI IN CINZIA-SERVER DURANTE AUTH NELLA CHIAMATA CHAT)

type ApiAuthResponse = {
  token: string;
  userId: string;
};
type ApiErrorResponse = {
  error: string;
};

/**
 * Authenticates the user with the given API key and returns a token. It should be used only server-side.
 * @param options - The options object.
 * @param options.apiKey - The API key to use for authentication.
 * @returns A Promise that resolves with the an object containing the authentication token and the user id.
 * @throws If there is an error with the API request or if the response is invalid.
 */
export async function auth({ apiKey }: { apiKey: string }) {
  if (typeof window !== 'undefined') console.warn('ONLY USE SERVER-SIDE');
  const response = await fetchApi('/auth', { method: 'POST', body: JSON.stringify({ apiKey }) });
  const data = (await response.json()) as ApiAuthResponse | ApiErrorResponse;
  if (!data) throw new Error('No data returned from auth');
  if ('error' in data) throw new Error(data.error ?? 'Unknown error');
  const { token, userId } = data;
  if (!token) throw new Error('No token returned from auth');
  return { token, userId };
}

type Message = {
  time: string;
  role: 'user' | 'assistant' | 'system' | 'dev';
  token: number;
  content: string;
  source: string;
};

type ApiChatRequest = {
  locale: string;
  messages: Message[]; // TODO: fare tipo
  mode: 'turbo' | 'title' | 'standard';
  token: string;
  modelId?: string;
};

/**
 * Sends a chat request to cinzia-server.
 * @param body - The request body.
 * @param body.locale - The locale to use for the chat.
 * @param body.messages - TODO
 * @param body.mode - The chat mode. Can be "turbo", "title" or "standard".
 * @param body.token - The authentication token to be taken with the "auth" function.
 * @param body.modelId - The ID of the Model created on Cinzia.app.
 * @param callback - A function that's called every time a new message is received from the server.
 * @returns A Promise that resolves with the response body as a text/event-stream.
 */
export async function chat(body: ApiChatRequest, callback?: (data: string) => void) {
  const response = await fetchApi('/chat', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response || !response.body) throw new Error('No response from chat');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const stream = { reader, decoder };

  let done = false;
  let text = '';

  while (!done) {
    const { value } = await stream.reader.read();
    if (!value) {
      done = true;
      break;
    }

    const chunkValue = stream.decoder.decode(value);
    text += chunkValue;
    callback?.(text);
  }
  return text;
}
