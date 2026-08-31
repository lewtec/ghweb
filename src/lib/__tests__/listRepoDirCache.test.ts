import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/auth', async () => {
  const actual = await vi.importActual<typeof import('../auth')>('../auth');
  return {
    ...actual,
    getToken: () => 'test-token',
    getRestBase: () => 'https://api.github.com',
    getWebOrigin: () => 'https://github.com',
  };
});

import { clearRepoDirCache, listRepoDir } from '../rest';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('listRepoDir cache TTL', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    clearRepoDirCache();
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    clearRepoDirCache();
  });

  it('serves a warm positive listing without re-fetching', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse([
        { name: 'a.ts', path: 'a.ts', type: 'file' },
        { name: 'src', path: 'src', type: 'dir' },
      ]),
    );

    const first = await listRepoDir('o', 'r', 'main', '');
    const second = await listRepoDir('o', 'r', 'main', '');

    expect(first?.map((e) => e.name)).toEqual(['src', 'a.ts']);
    expect(second).toEqual(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('re-fetches after the positive TTL elapses', async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse([{ name: 'old.ts', path: 'old.ts', type: 'file' }]),
      )
      .mockResolvedValueOnce(
        jsonResponse([{ name: 'new.ts', path: 'new.ts', type: 'file' }]),
      );

    const first = await listRepoDir('o', 'r', 'main', 'src');
    expect(first?.[0]?.name).toBe('old.ts');

    vi.advanceTimersByTime(30_001);

    const second = await listRepoDir('o', 'r', 'main', 'src');
    expect(second?.[0]?.name).toBe('new.ts');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('expires 404 misses faster than positive listings', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: 'Not Found' }, 404))
      .mockResolvedValueOnce(
        jsonResponse([{ name: 'now.ts', path: 'now.ts', type: 'file' }]),
      );

    expect(await listRepoDir('o', 'r', 'main', 'missing')).toBeNull();
    // Still inside the short null TTL — no second network call
    expect(await listRepoDir('o', 'r', 'main', 'missing')).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5_001);

    const recovered = await listRepoDir('o', 'r', 'main', 'missing');
    expect(recovered?.[0]?.name).toBe('now.ts');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
