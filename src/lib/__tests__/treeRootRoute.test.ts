import { describe, expect, it } from 'vitest';
import { appPathForObject } from '@/lib/repoPath';
import { makeRepoCodeRouter } from './repoCodeRouter';

describe('tree at commit/branch root', () => {
  const sha = 'c5de9d90c128b77ddc31d9f55b1de5c65d6ab339';

  it('matches a tree route for /owner/repo/tree/<sha>', async () => {
    const path = appPathForObject('fetchurl', 'sdk-rust', sha, '', 'tree');
    expect(path).toBe(`/fetchurl/sdk-rust/tree/${sha}`);
    const router = makeRepoCodeRouter(path);
    await router.load();
    const last = router.state.matches.at(-1);
    expect(router.state.matches.length).toBeGreaterThan(0);
    expect(last?.routeId).toMatch(/tree/);
    expect((last?.params as { ref?: string }).ref).toBe(sha);
  });

  it('matches tree/main', async () => {
    const router = makeRepoCodeRouter('/o/r/tree/main');
    await router.load();
    const last = router.state.matches.at(-1);
    expect(last?.routeId).toMatch(/tree/);
    expect((last?.params as { ref?: string }).ref).toBe('main');
  });
});
