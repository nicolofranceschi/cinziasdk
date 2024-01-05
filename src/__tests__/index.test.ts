const API_KEY = '6585661277b7998ecb53c1c1';
import { describe, it, expect } from '@jest/globals';
import { auth, chat } from '../index';

describe('index', () => {
  let token: string;
  it('should reply', async () => {
    const user = await auth({ apiKey: API_KEY });
    token = user.token;
    const res = await chat({
      locale: 'it',
      messages: [],
      mode: 'standard',
      token,
    });
    expect(typeof res).toBe('string');
  });
  it('should reply with', async () => {
    const res = await chat({
      locale: 'it',
      messages: [
        {
          time: new Date().toISOString(),
          role: 'user',
          token: 10,
          content: 'Quanto fa 1+1?',
          source: 'chat',
        },
      ],
      mode: 'standard',
      token,
    });
    expect(typeof res).toBe('string');
  });
});

describe('chat', () => {});
