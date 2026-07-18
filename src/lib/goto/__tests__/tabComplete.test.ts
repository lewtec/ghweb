import { describe, expect, it } from 'vitest';
import { expandSlash, tabCompleteQuery } from '../tabComplete';
import type { GotoCandidate } from '../types';

function pathItem(
  path: string,
  opts?: { dir?: boolean; value?: string },
): GotoCandidate {
  return {
    id: `path:${path}`,
    label: opts?.dir ? `${path}/` : path || '/',
    value: opts?.value ?? `path ${path}`,
    group: 'Path',
    icon: 'path',
    priority: 10,
    action: {
      kind: 'open-repo-path',
      owner: 'o',
      name: 'r',
      ref: 'main',
      path,
      knownKind: opts?.dir ? 'tree' : 'blob',
    },
  };
}

describe('expandSlash', () => {
  it('expands /pr to /prs ', () => {
    expect(expandSlash('/pr')).toBe('/prs ');
  });
  it('expands /i to /issues ', () => {
    expect(expandSlash('/i')).toBe('/issues ');
  });
  it('expands /s to /search ', () => {
    expect(expandSlash('/s')).toBe('/search ');
  });
  it('no-op when ambiguous or already has rest', () => {
    expect(expandSlash('/prs foo')).toBeNull();
  });
});

describe('tabCompleteQuery', () => {
  it('expands path to directory with trailing slash', () => {
    const items = [pathItem('src/lib', { dir: true, value: 'path src/lib' })];
    expect(tabCompleteQuery('s', items, 'path src/lib')).toBe('src/lib/');
  });

  it('expands path to file without slash', () => {
    const items = [pathItem('README.md', { value: 'path README.md' })];
    expect(tabCompleteQuery('READ', items, 'path README.md')).toBe(
      'README.md',
    );
  });

  it('expands slash command', () => {
    expect(tabCompleteQuery('/pr', [], '')).toBe('/prs ');
  });
});
