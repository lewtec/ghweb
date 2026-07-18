import { describe, expect, it } from 'vitest';
import { rankActiveRepos } from '../activeRepos';

describe('rankActiveRepos', () => {
  it('ranks triage work above idle membership-ish repos', () => {
    const ranked = rankActiveRepos({
      signals: [
        {
          nameWithOwner: 'acme/hot',
          kind: 'assigned',
          at: new Date().toISOString(),
        },
        {
          nameWithOwner: 'acme/hot',
          kind: 'review',
          at: new Date().toISOString(),
        },
      ],
      contributed: [
        {
          id: '1',
          nameWithOwner: 'acme/warm',
          name: 'warm',
          ownerLogin: 'acme',
          pushedAt: new Date().toISOString(),
        },
      ],
      pushed: [
        {
          id: '2',
          nameWithOwner: 'acme/cold',
          name: 'cold',
          ownerLogin: 'acme',
          pushedAt: '2020-01-01T00:00:00Z',
        },
      ],
      limit: 10,
    });
    expect(ranked[0]?.nameWithOwner).toBe('acme/hot');
    expect(ranked.map((r) => r.nameWithOwner)).toContain('acme/warm');
  });
});
