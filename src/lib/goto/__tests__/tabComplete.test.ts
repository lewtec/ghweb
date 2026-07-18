import { describe, expect, it } from 'vitest';
import { expandSlash, tabCompleteQuery } from '../tabComplete';
import type { GotoCandidate, PathNavAnchor } from '../types';

const anchor: PathNavAnchor = {
  owner: 'o',
  name: 'r',
  refName: 'main',
  mode: 'tree',
  path: 'src',
  cwd: 'src',
};

function pathItem(
  path: string,
  opts?: { dir?: boolean; value?: string },
): GotoCandidate {
  return {
    id: `path:${path}`,
    label: 'placeholder',
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
  it('does not treat /src as slash command', () => {
    expect(expandSlash('/src')).toBeNull();
  });
});

describe('tabCompleteQuery', () => {
  it('writes relative dir path with trailing slash', () => {
    const items = [pathItem('src/lib', { dir: true, value: 'path src/lib' })];
    expect(tabCompleteQuery('l', items, 'path src/lib', anchor)).toBe(
      'lib/',
    );
  });

  it('writes .. for parent', () => {
    const items = [pathItem('src', { dir: true, value: 'path up' })];
    // from tree at src/lib
    const a: PathNavAnchor = { ...anchor, path: 'src/lib', cwd: 'src/lib' };
    expect(tabCompleteQuery('..', items, 'path up', a)).toBe('../');
  });

  it('expands slash command', () => {
    expect(tabCompleteQuery('/pr', [], '', null)).toBe('/prs ');
  });
});
