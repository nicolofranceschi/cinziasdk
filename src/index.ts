/**
 * @file This file contains functions for making API requests to cinzia-server.
 * @module cinzia-sdk
 */

import fetchApi from './helpers/fetch';

// QUESTIONS:
// questa sdk verrà usata da applicativi frontend? In tal caso, come abilitiamo cors su cinzia-server?
// cinzia-server in caso di errore restituisce "token: 'none'", forse sarebbe meglio ometterlo per avere un tipo di errore più uniforme con le altre chiamate
// il token è utilizzabile una sola volta, ma non ha scadenza?
// chat vuole un chatId, ma come fa il client a recuperarlo?
// chat vuole uno userId, ma come fa il client a recuperarlo?
// mode non dovrebbe essere un'enum? I valori sono solo "turbo" e "title"?

type ApiAuthResponse = {
  token: string;
};
type ApiErrorResponse = {
  error: string;
};

/**
 * Authenticates the user with the given API key and returns a token.
 * @param options - The options object.
 * @param options.apiKey - The API key to use for authentication.
 * @returns A Promise that resolves with the authentication token.
 * @throws If there is an error with the API request or if the response is invalid.
 */
export async function auth({ apiKey }: { apiKey: string }) {
  const response = await fetchApi(`/auth/${apiKey}`);
  const data = (await response.json()) as ApiAuthResponse | ApiErrorResponse;
  if (!data) throw new Error('No data returned from auth');
  if ('error' in data) throw new Error(data.error ?? 'Unknown error');
  if (!data.token) throw new Error('No token returned from auth');
  return data.token;
}

type ApiChatRequest = {
  locale: string;
  chatId: string;
  mode: 'turbo' | 'title';
  userId: string;
  token: string;
};

/**
 * Sends a chat request to cinzia-server.
 * @param body - The request body.
 * @param body.locale - The locale to use for the chat.
 * @param body.chatId - The ID of the chat.
 * @param body.mode - The chat mode. Can be "turbo" or "title".
 * @param body.userId - The ID of the user.
 * @param body.token - The authentication token to be taken with the "auth" function.
 * @returns A Promise that resolves with the response body as a text/event-stream.
 */
export async function chat(body: ApiChatRequest) {
  const response = await fetchApi('/chat', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.body;
}
