/** Home preview size — keep GraphQL `first:` on HomePage in sync. */
export const TRIAGE_HOME_PREVIEW = 8;

export const TRIAGE_PAGE_SIZE = 40;

/** GitHub `search` will not return more than this, even if `issueCount` is higher. */
export const TRIAGE_SEARCH_CAP = 1000;

export const TRIAGE = {
  assigned: {
    path: '/triage/assigned',
    title: 'Assigned issues',
    searchQuery: 'is:open is:issue assignee:@me sort:updated-desc',
  },
  reviews: {
    path: '/triage/reviews',
    title: 'Review requests',
    searchQuery: 'is:open is:pr review-requested:@me sort:updated-desc',
  },
  prs: {
    path: '/triage/prs',
    title: 'My open PRs',
    searchQuery: 'is:open is:pr author:@me sort:updated-desc',
  },
} as const;

export type TriageKind = keyof typeof TRIAGE;

export type TriagePath = (typeof TRIAGE)[TriageKind]['path'];
