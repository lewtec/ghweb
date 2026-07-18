import { describe, expect, it } from 'vitest';
import { fuzzyMatch, parseRepoFromPath } from '../recentRepos';

describe('fuzzyMatch', () => {
  it('matches subsequence', () => {
    expect(fuzzyMatch('NixOS/nixpkgs', 'nix')).toBe(true);
    expect(fuzzyMatch('NixOS/nixpkgs', 'nxp')).toBe(true);
    expect(fuzzyMatch('NixOS/nixpkgs', 'zzz')).toBe(false);
  });
});

describe('parseRepoFromPath', () => {
  it('parses owner/name', () => {
    expect(parseRepoFromPath('/NixOS/nixpkgs/pull/1/files')).toEqual({
      owner: 'NixOS',
      name: 'nixpkgs',
    });
  });
});
