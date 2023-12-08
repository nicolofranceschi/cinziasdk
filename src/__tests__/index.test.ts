describe('index', () => {
  it('should resolve', async () => {
    await expect(Promise.resolve()).resolves.toBeUndefined();
  });
});

describe('chat', () => {});
