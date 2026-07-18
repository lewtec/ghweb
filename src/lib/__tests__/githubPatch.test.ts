import { describe, expect, it } from 'vitest';
import { normalizeGithubPatch } from '../githubPatch';

describe('normalizeGithubPatch', () => {
  it('splits multi-hunk github patch', () => {
    const patch = [
      '@@ -1,2 +1,3 @@',
      ' a',
      '-b',
      '+c',
      '+d',
      '@@ -10,1 +11,1 @@',
      '-x',
      '+y',
    ].join('\n');
    const hunks = normalizeGithubPatch(patch);
    expect(hunks.length).toBe(2);
    expect(hunks[0]).toMatch(/^@@ -1,2 \+1,3 @@\n/);
    expect(hunks[0]!.endsWith('\n')).toBe(true);
  });

  it('adds missing trailing newline and context prefix for bare lines', () => {
    const patch = '@@ -1 +1 @@\nhello';
    const hunks = normalizeGithubPatch(patch);
    expect(hunks).toHaveLength(1);
    expect(hunks[0]).toContain('\n hello\n');
  });

  it('returns empty for no hunks', () => {
    expect(normalizeGithubPatch('Binary files differ')).toEqual([]);
  });
});
