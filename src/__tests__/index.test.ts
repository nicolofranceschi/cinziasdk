import { auth } from '../index';
import fetchMock from 'jest-fetch-mock';

describe('auth', () => {
  it('should return a token when given a valid apiKey', async () => {
    const apiKey = 'valid-api-key';
    const token = 'valid-token';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ token }),
    } as any);

    const result = await auth({ apiKey });

    expect(result).toEqual(token);
    expect(global.fetch).toHaveBeenCalledWith(`/auth/${apiKey}`);
  });

  it('should throw an error when no data is returned from the API', async () => {
    const apiKey = 'invalid-api-key';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(null),
    } as any);

    await expect(auth({ apiKey })).rejects.toThrow('No data returned from auth');
    expect(global.fetch).toHaveBeenCalledWith(`/auth/${apiKey}`);
  });

  it('should throw an error when an error is returned from the API', async () => {
    const apiKey = 'invalid-api-key';
    const error = 'Invalid API key';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ error }),
    } as any);

    await expect(auth({ apiKey })).rejects.toThrow(error);
    expect(global.fetch).toHaveBeenCalledWith(`/auth/${apiKey}`);
  });

  it('should throw an error when no token is returned from the API', async () => {
    const apiKey = 'invalid-api-key';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    } as any);

    await expect(auth({ apiKey })).rejects.toThrow('No token returned from auth');
    expect(global.fetch).toHaveBeenCalledWith(`/auth/${apiKey}`);
  });
});
import { chat } from '../index';

describe('chat', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should call the chat endpoint with the correct arguments', async () => {
    const body = { message: 'Hello, world!' };
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await chat(body);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('/chat');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: 'POST',
      body: JSON.stringify(body),
    });
  });

  it('should return the response body', async () => {
    const responseBody = { message: 'Hello, world!' };
    fetchMock.mockResponseOnce(JSON.stringify(responseBody));

    const result = await chat({});

    expect(result).toEqual(responseBody);
  });
});
