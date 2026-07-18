import { describe, expect, it } from 'vitest';
import {
  appPathForObject,
  cwdFromCodeLocation,
  isPathExpression,
  resolveRepoPath,
} from '../repoPath';

describe('resolveRepoPath', () => {
  it('resolves relative with ..', () => {
    expect(resolveRepoPath('src/lib', '../../foo/bar.ts')).toBe('foo/bar.ts');
    expect(resolveRepoPath('src/lib', '../index.ts')).toBe('src/index.ts');
    expect(resolveRepoPath('src/lib', './x.ts')).toBe('src/lib/x.ts');
  });

  it('absolute from repo root', () => {
    expect(resolveRepoPath('src/lib', '/pkg/a.ts')).toBe('pkg/a.ts');
  });

  it('stays at root on excess ..', () => {
    expect(resolveRepoPath('', '../../x')).toBe('x');
    expect(resolveRepoPath('a', '../../')).toBe('');
  });
});

describe('cwdFromCodeLocation', () => {
  it('blob uses parent dir', () => {
    expect(
      cwdFromCodeLocation({ mode: 'blob', path: 'src/index.css' }),
    ).toBe('src');
  });
  it('tree uses path', () => {
    expect(cwdFromCodeLocation({ mode: 'tree', path: 'src' })).toBe('src');
  });
});

describe('isPathExpression', () => {
  it('detects relative paths', () => {
    expect(isPathExpression('../../foo')).toBe(true);
    expect(isPathExpression('./a.ts')).toBe(true);
    expect(isPathExpression('index.css')).toBe(true);
    expect(isPathExpression('/src/x')).toBe(true);
  });
  it('ignores slash commands', () => {
    expect(isPathExpression('/code')).toBe(false);
    expect(isPathExpression('/issues foo')).toBe(false);
  });
});

describe('appPathForObject', () => {
  it('builds blob and tree urls', () => {
    expect(appPathForObject('o', 'r', 'main', 'src/a.ts', 'blob')).toBe(
      '/o/r/blob/main/src/a.ts',
    );
    expect(appPathForObject('o', 'r', 'main', '', 'tree')).toBe(
      '/o/r/tree/main',
    );
  });
});
