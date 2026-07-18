import { useMemo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { Link } from '@tanstack/react-router';
import type { HomePageQuery } from './__generated__/HomePageQuery.graphql';
import {
  activeKeys,
  rankActiveRepos,
  type RepoRef,
  type WorkSignal,
} from '@/lib/activeRepos';

const query = graphql`
  query HomePageQuery {
    rateLimit {
      cost
      remaining
      limit
      resetAt
    }
    viewer {
      login
      name
      avatarUrl
      repositoriesContributedTo(
        first: 20
        contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]
        orderBy: { field: PUSHED_AT, direction: DESC }
        includeUserRepositories: true
      ) {
        nodes {
          id
          nameWithOwner
          name
          owner {
            login
          }
          description
          isPrivate
          pushedAt
          updatedAt
          issues(states: OPEN) {
            totalCount
          }
          pullRequests(states: OPEN) {
            totalCount
          }
        }
      }
      repositories(
        first: 25
        orderBy: { field: PUSHED_AT, direction: DESC }
        affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
        ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
      ) {
        nodes {
          id
          nameWithOwner
          name
          owner {
            login
          }
          description
          isPrivate
          pushedAt
          updatedAt
          issues(states: OPEN) {
            totalCount
          }
          pullRequests(states: OPEN) {
            totalCount
          }
        }
      }
    }
    reviewRequests: search(
      query: "is:open is:pr review-requested:@me"
      type: ISSUE
      first: 15
    ) {
      issueCount
      nodes {
        ... on PullRequest {
          id
          number
          title
          updatedAt
          repository {
            nameWithOwner
            owner {
              login
            }
            name
          }
        }
      }
    }
    assignedIssues: search(
      query: "is:open is:issue assignee:@me"
      type: ISSUE
      first: 15
    ) {
      issueCount
      nodes {
        ... on Issue {
          id
          number
          title
          updatedAt
          repository {
            nameWithOwner
            owner {
              login
            }
            name
          }
        }
      }
    }
    myOpenPrs: search(
      query: "is:open is:pr author:@me"
      type: ISSUE
      first: 15
    ) {
      issueCount
      nodes {
        ... on PullRequest {
          id
          number
          title
          updatedAt
          isDraft
          repository {
            nameWithOwner
            owner {
              login
            }
            name
          }
        }
      }
    }
  }
`;

function fmtDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function toRepoRef(
  r: {
    readonly id: string;
    readonly nameWithOwner: string;
    readonly name: string;
    readonly owner: { readonly login: string };
    readonly description?: string | null;
    readonly isPrivate?: boolean | null;
    readonly pushedAt?: string | null;
    readonly updatedAt?: string | null;
    readonly issues?: { readonly totalCount: number } | null;
    readonly pullRequests?: { readonly totalCount: number } | null;
  } | null | undefined,
): RepoRef | null {
  if (!r) return null;
  return {
    id: r.id,
    nameWithOwner: r.nameWithOwner,
    name: r.name,
    ownerLogin: r.owner.login,
    description: r.description,
    isPrivate: r.isPrivate,
    pushedAt: r.pushedAt ?? null,
    updatedAt: r.updatedAt ?? null,
    openIssues: r.issues?.totalCount ?? null,
    openPrs: r.pullRequests?.totalCount ?? null,
  };
}

function signalLabel(kinds: string[]): string {
  const parts: string[] = [];
  if (kinds.includes('assigned')) parts.push('assigned');
  if (kinds.includes('review')) parts.push('review');
  if (kinds.includes('authored_pr')) parts.push('your PRs');
  return parts.join(' · ');
}

export function HomePage() {
  const data = useLazyLoadQuery<HomePageQuery>(query, {});

  const { active, more } = useMemo(() => {
    const signals: WorkSignal[] = [];

    for (const n of data.assignedIssues.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      signals.push({
        nameWithOwner: n.repository.nameWithOwner,
        kind: 'assigned',
        at: n.updatedAt,
      });
    }
    for (const n of data.reviewRequests.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      signals.push({
        nameWithOwner: n.repository.nameWithOwner,
        kind: 'review',
        at: n.updatedAt,
      });
    }
    for (const n of data.myOpenPrs.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      signals.push({
        nameWithOwner: n.repository.nameWithOwner,
        kind: 'authored_pr',
        at: n.updatedAt,
      });
    }

    const contributed = (data.viewer.repositoriesContributedTo.nodes ?? [])
      .map(toRepoRef)
      .filter((r): r is RepoRef => r != null);
    const pushed = (data.viewer.repositories.nodes ?? [])
      .map(toRepoRef)
      .filter((r): r is RepoRef => r != null);

    const activeList = rankActiveRepos({
      signals,
      contributed,
      pushed,
      limit: 12,
    });
    const activeSet = activeKeys(activeList);
    const moreList = pushed.filter((r) => !activeSet.has(r.nameWithOwner));

    return { active: activeList, more: moreList };
  }, [data]);

  return (
    <div className="mx-auto max-w-6xl p-3 md:p-4 space-y-6 dense-list w-full">
      {data.rateLimit && data.rateLimit.remaining < 500 ? (
        <div className="alert alert-warning text-sm py-2">
          GraphQL points remaining: {data.rateLimit.remaining}/
          {data.rateLimit.limit} (reset {fmtDate(data.rateLimit.resetAt)})
        </div>
      ) : null}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-2">
          Triage
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                Assigned issues ({data.assignedIssues.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.assignedIssues.nodes?.filter(Boolean).length ? (
                  data.assignedIssues.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row">
                        <Link
                          to="/$owner/$name/issues/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover"
                        >
                          <span className="opacity-60 text-xs mr-1">
                            {n.repository.nameWithOwner}#{n.number}
                          </span>
                          {n.title}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="dense-row opacity-60 text-sm">None open</li>
                )}
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                Review requests ({data.reviewRequests.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.reviewRequests.nodes?.filter(Boolean).length ? (
                  data.reviewRequests.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row">
                        <Link
                          to="/$owner/$name/pull/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover"
                        >
                          <span className="opacity-60 text-xs mr-1">
                            {n.repository.nameWithOwner}#{n.number}
                          </span>
                          {n.title}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="dense-row opacity-60 text-sm">None open</li>
                )}
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 md:col-span-2 xl:col-span-1">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                My open PRs ({data.myOpenPrs.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.myOpenPrs.nodes?.filter(Boolean).length ? (
                  data.myOpenPrs.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row">
                        <Link
                          to="/$owner/$name/pull/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover"
                        >
                          <span className="opacity-60 text-xs mr-1">
                            {n.repository.nameWithOwner}#{n.number}
                          </span>
                          {n.title}
                          {'isDraft' in n && n.isDraft ? (
                            <span className="badge badge-ghost badge-xs ml-1">
                              draft
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="dense-row opacity-60 text-sm">None open</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-1">
          Active repositories
        </h2>
        <p className="text-xs opacity-50 mb-2">
          Ranked from your open work (assigned, reviews, your PRs), recent
          contributions, and pushes — not every org membership.
        </p>
        <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 w-full">
          {active.length ? (
            active.map((r) => (
              <li
                key={r.id}
                className="dense-row flex flex-wrap items-center gap-x-3 gap-y-1 w-full"
              >
                <Link
                  to="/$owner/$name"
                  params={{ owner: r.ownerLogin, name: r.name }}
                  className="link link-hover font-medium"
                >
                  {r.nameWithOwner}
                </Link>
                {r.isPrivate ? (
                  <span className="badge badge-ghost badge-sm">private</span>
                ) : null}
                {r.signals.length ? (
                  <span className="badge badge-outline badge-sm">
                    {signalLabel(r.signals)}
                  </span>
                ) : null}
                {r.openIssues != null || r.openPrs != null ? (
                  <span className="text-xs opacity-60">
                    {r.openIssues != null ? `${r.openIssues} issues` : null}
                    {r.openIssues != null && r.openPrs != null ? ' · ' : null}
                    {r.openPrs != null ? `${r.openPrs} PRs` : null}
                  </span>
                ) : null}
                <span className="flex gap-2 text-xs ml-auto">
                  <Link
                    to="/$owner/$name/issues"
                    params={{ owner: r.ownerLogin, name: r.name }}
                    className="link link-hover opacity-70"
                  >
                    Issues
                  </Link>
                  <Link
                    to="/$owner/$name/pulls"
                    params={{ owner: r.ownerLogin, name: r.name }}
                    className="link link-hover opacity-70"
                  >
                    PRs
                  </Link>
                </span>
                {r.description ? (
                  <span className="opacity-70 text-sm basis-full">
                    {r.description}
                  </span>
                ) : null}
                <span className="text-xs opacity-50 basis-full sm:basis-auto">
                  {r.lastActivityAt
                    ? fmtDate(r.lastActivityAt)
                    : r.pushedAt
                      ? fmtDate(r.pushedAt)
                      : null}
                </span>
              </li>
            ))
          ) : (
            <li className="dense-row opacity-60 text-sm">
              No active work signals yet — open issues/PRs or push to a repo.
            </li>
          )}
        </ul>
      </section>

      {more.length ? (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-2">
            More repositories
          </h2>
          <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 w-full">
            {more.map((r) => (
              <li
                key={r.id}
                className="dense-row flex flex-wrap gap-x-3 gap-y-1 w-full"
              >
                <Link
                  to="/$owner/$name"
                  params={{ owner: r.ownerLogin, name: r.name }}
                  className="link link-hover font-medium"
                >
                  {r.nameWithOwner}
                </Link>
                {r.isPrivate ? (
                  <span className="badge badge-ghost badge-sm">private</span>
                ) : null}
                {r.description ? (
                  <span className="opacity-70 text-sm grow basis-full sm:basis-auto">
                    {r.description}
                  </span>
                ) : null}
                <span className="text-xs opacity-50 ml-auto">
                  {r.pushedAt ? fmtDate(r.pushedAt) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
