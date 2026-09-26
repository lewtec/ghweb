import { describe, expect, it } from 'vitest';
import { appPathForObject } from '@/lib/repoPath';
import { makeRepoCodeRouter } from './repoCodeRouter';

describe('file-view breadcrumb branch link', () => {
  it('absolute tree root from blob clears file path', async () => {
    const router = makeRepoCodeRouter('/o/r/blob/main/src/App.tsx');
    await router.load();

    const href = appPathForObject('o', 'r', 'main', '', 'tree');
    expect(href).toBe('/o/r/tree/main');

    await router.navigate({ to: href });
    await router.load();

    expect(router.state.location.pathname).toBe('/o/r/tree/main');
    expect(
      (router.state.matches.at(-1)?.params as { _splat?: string })._splat ?? '',
    ).toBe('');
  });

  it('typed splat without clearing inherits blob path (the bug)', async () => {
    const router = makeRepoCodeRouter('/o/r/blob/main/src/App.tsx');
    await router.load();
    const loc = router.buildLocation({
      to: '/$owner/$name/tree/$ref/$',
      params: { owner: 'o', name: 'r', ref: 'main' },
    });
    expect(loc.pathname).toBe('/o/r/tree/main/src/App.tsx');
  });
});
