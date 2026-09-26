import { describe, expect, it } from 'vitest';
import { authorFromActor } from '@/components/AuthorByline';

describe('authorFromActor', () => {
  it('returns null for a missing actor', () => {
    expect(authorFromActor(null)).toBeNull();
    expect(authorFromActor(undefined)).toBeNull();
  });

  it('keeps login and avatar and reads name when present', () => {
    expect(
      authorFromActor({
        login: 'octocat',
        avatarUrl: 'https://example/a.png',
        name: 'The Octocat',
      }),
    ).toEqual({
      login: 'octocat',
      avatarUrl: 'https://example/a.png',
      name: 'The Octocat',
    });
  });

  it('omits name when the actor has no name field', () => {
    const bot = { login: 'dependabot', avatarUrl: null };
    expect(authorFromActor(bot)).toEqual({
      login: 'dependabot',
      avatarUrl: null,
      name: null,
    });
  });
});
