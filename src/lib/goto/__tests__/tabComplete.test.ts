import { describe, expect, it } from 'vitest';
import { expandSlash, tabCompleteQuery, toAbsoluteQuery } from '../tabComplete';
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

describe('toAbsoluteQuery', () => {
  it('adds leading slash and trailing for dirs', () => {
    expect(toAbsoluteQuery('src/lib', true)).toBe('/src/lib/');
    expect(toAbsoluteQuery('README.md', false)).toBe('/README.md');
    expect(toAbsoluteQuery('', true)).toBe('/');
  });
});

describe('expandSlash', () => {
  it('expands /pr to /prs ', () => {
    expect(expandSlash('/pr')).toBe('/prs ');
  });
  it('expands /i to /issues ', () => {
    expect(expandSlash('/i')).toBe('/issues ');
  });
  it('does not treat /src as slash command', () => {
    expect(expandSlash('/src')).toBeNull();
  });
});

describe('tabCompleteQuery', () => {
  it('replaces query with absolute dir path', () => {
    const items = [pathItem('src/lib', { dir: true, value: 'path src/lib' })];
    expect(tabCompleteQuery('s', items, 'path src/lib')).toBe('/src/lib/');
    expect(tabCompleteQuery('li', items, 'path src/lib')).toBe('/src/lib/');
  });

  it('replaces query with absolute file path', () => {
    const items = [pathItem('README.md', { value: 'path README.md' })];
    expect(tabCompleteQuery('READ', items, 'path README.md')).toBe(
      '/README.md',
    );
  });

  it('expands slash command', () => {
    expect(tabCompleteQuery('/pr', [], '')).toBe('/prs ');
  });
});
