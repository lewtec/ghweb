import { describe, expect, it } from 'vitest';
import { completionContext } from '../pathSuggest';
import type { PathNavAnchor } from '../types';

const root: PathNavAnchor = {
  owner: 'o',
  name: 'r',
  refName: 'main',
  mode: 'tree',
  path: '',
  cwd: '',
};

const blob: PathNavAnchor = {
  owner: 'o',
  name: 'r',
  refName: 'master',
  mode: 'blob',
  path: 'DESIGN.md',
  cwd: '',
};

describe('completionContext', () => {
  it('completes first segment at repo root', () => {
    expect(completionContext(root, 'src')).toEqual({
      listDir: '',
      prefix: 'src',
    });
  });

  it('lists children of a typed directory prefix', () => {
    expect(completionContext(root, 'src/li')).toEqual({
      listDir: 'src',
      prefix: 'li',
    });
  });

  it('.. from root file lists repo root', () => {
    expect(completionContext(blob, '..')).toEqual({
      listDir: '',
      prefix: '',
    });
  });
});
