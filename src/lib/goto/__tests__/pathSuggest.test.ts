import { describe, expect, it } from 'vitest';
import { completionContext } from '../pathSuggest';
import type { PathNavAnchor } from '../types';
import { relativeToLocation, resolveFromCodeLocation } from '../../repoPath';

const root: PathNavAnchor = {
  owner: 'o',
  name: 'r',
  refName: 'main',
  mode: 'tree',
  path: '',
  cwd: '',
};

const nested: PathNavAnchor = {
  owner: 'o',
  name: 'r',
  refName: 'main',
  mode: 'tree',
  path: 'src/lib',
  cwd: 'src/lib',
};

describe('completionContext', () => {
  it('completes first segment at repo root', () => {
    expect(completionContext(root, 'src')).toEqual({
      listDir: '',
      prefix: 'src',
    });
  });

  it('.. from nested tree lists parent', () => {
    expect(completionContext(nested, '..')).toEqual({
      listDir: 'src',
      prefix: '',
    });
  });
});

describe('relative + resolve', () => {
  it('.. from nested tree is parent', () => {
    expect(
      resolveFromCodeLocation({ mode: 'tree', path: 'src/lib' }, '..'),
    ).toBe('src');
    expect(
      relativeToLocation({ mode: 'tree', path: 'src/lib' }, 'src', true),
    ).toBe('../');
  });

  it('.. from blob climbs out of containing dir', () => {
    expect(
      resolveFromCodeLocation(
        { mode: 'blob', path: 'src/lib/foo.ts' },
        '..',
      ),
    ).toBe('src');
    expect(
      relativeToLocation(
        { mode: 'blob', path: 'src/lib/foo.ts' },
        'src',
        true,
      ),
    ).toBe('../');
  });

  it('sibling is relative without abs prefix', () => {
    expect(
      relativeToLocation(
        { mode: 'tree', path: 'src/lib' },
        'src/lib/bar.ts',
        false,
      ),
    ).toBe('bar.ts');
  });
});
