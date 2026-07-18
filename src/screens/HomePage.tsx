import { Suspense, useMemo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import type { HomePageQuery } from './__generated__/HomePageQuery.graphql';
import type { HomePageMoreReposQuery } from './__generated__/HomePageMoreReposQuery.graphql';
import {
  activeKeys,
  rankActiveRepos,
  type RepoRef,
  type WorkSignal,
} from '@/lib/activeRepos';
import { LoadingBlock } from '@/components/LoadingBlock';

/**
 * Triage-only query — must stay under GitHub resource limits.
 * Repo membership lists live in a separate lightweight query.
 */
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
    }
    reviewRequests: search(
      query: "is:open is:pr review-requested:@me sort:updated-desc"
      type: ISSUE
      first: 8
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
      query: "is:open is:issue assignee:@me sort:updated-desc"
      type: ISSUE
      first: 8
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
      query: "is:open is:pr author:@me sort:updated-desc"
      type: ISSUE
      first: 8
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

const moreReposQuery = graphql`
  query HomePageMoreReposQuery {
    viewer {
      repositories(
        first: 10
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

function signalLabel(kinds: string[]): string {
  const parts: string[] = [];
  if (kinds.includes('assigned')) parts.push('assigned');
  if (kinds.includes('review')) parts.push('review');
  if (kinds.includes('authored_pr')) parts.push('your PRs');
  return parts.join(' · ');
}

function HomeMoreRepos({
  exclude,
}: {
  exclude: Set<string>;
}) {
  const data = useLazyLoadQuery<HomePageMoreReposQuery>(
    moreReposQuery,
    {},
    STORE_AND_NETWORK,
  );
  const nodes = data.viewer.repositories.nodes ?? [];
  const more = nodes.flatMap((r) => {
    if (r == null || exclude.has(r.nameWithOwner)) return [];
    return [r];
  });

  if (!more.length) return null;

  return (
    <section className="w-full min-w-0">
      <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-2">
        More repositories
      </h2>
      <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 w-full">
        {more.map((r) => (
          <li
            key={r.id}
            className="dense-row flex flex-wrap items-center gap-x-3 gap-y-1 w-full min-w-0"
          >
            <Link
              to="/$owner/$name"
              params={{ owner: r.owner.login, name: r.name }}
              className="link link-hover font-medium min-w-0 truncate"
            >
              {r.nameWithOwner}
            </Link>
            {r.isPrivate ? (
              <span className="badge badge-ghost badge-sm shrink-0">
                private
              </span>
            ) : null}
            {r.description ? (
              <span className="opacity-70 text-sm min-w-0 flex-1 basis-full sm:basis-0 truncate">
                {r.description}
              </span>
            ) : null}
            <span className="text-xs opacity-50 shrink-0 ms-auto">
              {r.pushedAt ? fmtDate(r.pushedAt) : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomePage() {
  const data = useLazyLoadQuery<HomePageQuery>(query, {}, STORE_AND_NETWORK);

  const { active, activeSet } = useMemo(() => {
    const signals: WorkSignal[] = [];
    const openIssuesByRepo = new Map<string, number>();
    const openPrsByRepo = new Map<string, number>();
    const repoMeta = new Map<string, RepoRef>();

    const bump = (map: Map<string, number>, key: string) => {
      map.set(key, (map.get(key) ?? 0) + 1);
    };

    const noteRepo = (
      nameWithOwner: string,
      ownerLogin: string,
      name: string,
    ) => {
      if (repoMeta.has(nameWithOwner)) return;
      repoMeta.set(nameWithOwner, {
        id: `work:${nameWithOwner}`,
        nameWithOwner,
        name,
        ownerLogin,
      });
    };

    for (const n of data.assignedIssues.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      const k = n.repository.nameWithOwner;
      noteRepo(k, n.repository.owner.login, n.repository.name);
      signals.push({ nameWithOwner: k, kind: 'assigned', at: n.updatedAt });
      bump(openIssuesByRepo, k);
    }
    for (const n of data.reviewRequests.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      const k = n.repository.nameWithOwner;
      noteRepo(k, n.repository.owner.login, n.repository.name);
      signals.push({ nameWithOwner: k, kind: 'review', at: n.updatedAt });
      bump(openPrsByRepo, k);
    }
    for (const n of data.myOpenPrs.nodes ?? []) {
      if (!n || !('repository' in n) || !n.repository) continue;
      const k = n.repository.nameWithOwner;
      noteRepo(k, n.repository.owner.login, n.repository.name);
      signals.push({
        nameWithOwner: k,
        kind: 'authored_pr',
        at: n.updatedAt,
      });
      bump(openPrsByRepo, k);
    }

    // Active = only repos that appear in open work (cheapest + most accurate)
    const activeList = rankActiveRepos({
      signals,
      contributed: [...repoMeta.values()],
      pushed: [],
      limit: 15,
    }).map((r) => ({
      ...r,
      openIssues: openIssuesByRepo.get(r.nameWithOwner) ?? null,
      openPrs: openPrsByRepo.get(r.nameWithOwner) ?? null,
    }));

    return { active: activeList, activeSet: activeKeys(activeList) };
  }, [data]);

  return (
    <div className="w-full min-w-0 p-[clamp(0.75rem,2vw,1.25rem)] space-y-[clamp(1rem,3vw,1.5rem)] dense-list">
      {data.rateLimit && data.rateLimit.remaining < 500 ? (
        <div className="alert alert-warning text-sm py-2">
          GraphQL points remaining: {data.rateLimit.remaining}/
          {data.rateLimit.limit} (reset {fmtDate(data.rateLimit.resetAt)})
        </div>
      ) : null}

      <section className="w-full min-w-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-2">
          Triage
        </h2>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full">
          <div className="card bg-base-100 border border-base-300 min-w-0">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                Assigned issues ({data.assignedIssues.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.assignedIssues.nodes?.filter(Boolean).length ? (
                  data.assignedIssues.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row min-w-0">
                        <Link
                          to="/$owner/$name/issues/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover block min-w-0"
                        >
                          <span className="opacity-60 text-xs me-1">
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

          <div className="card bg-base-100 border border-base-300 min-w-0">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                Review requests ({data.reviewRequests.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.reviewRequests.nodes?.filter(Boolean).length ? (
                  data.reviewRequests.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row min-w-0">
                        <Link
                          to="/$owner/$name/pull/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover block min-w-0"
                        >
                          <span className="opacity-60 text-xs me-1">
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

          <div className="card bg-base-100 border border-base-300 min-w-0 md:col-span-2 xl:col-span-1">
            <div className="card-body p-3 gap-1">
              <h3 className="font-medium text-sm">
                My open PRs ({data.myOpenPrs.issueCount})
              </h3>
              <ul className="divide-y divide-base-300">
                {data.myOpenPrs.nodes?.filter(Boolean).length ? (
                  data.myOpenPrs.nodes.map((n) => {
                    if (!n || !('number' in n) || !n.repository) return null;
                    return (
                      <li key={n.id} className="dense-row min-w-0">
                        <Link
                          to="/$owner/$name/pull/$number"
                          params={{
                            owner: n.repository.owner.login,
                            name: n.repository.name,
                            number: String(n.number),
                          }}
                          className="link link-hover block min-w-0"
                        >
                          <span className="opacity-60 text-xs me-1">
                            {n.repository.nameWithOwner}#{n.number}
                          </span>
                          {n.title}
                          {'isDraft' in n && n.isDraft ? (
                            <span className="badge badge-ghost badge-xs ms-1">
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

      <section className="w-full min-w-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-1">
          Active repositories
        </h2>
        <p className="text-xs opacity-50 mb-2">
          Repos that appear in your open work above (assigned, reviews, your
          PRs).
        </p>
        <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 w-full">
          {active.length ? (
            active.map((r) => (
              <li
                key={r.id}
                className="dense-row flex flex-wrap items-center gap-x-3 gap-y-1 w-full min-w-0"
              >
                <Link
                  to="/$owner/$name"
                  params={{ owner: r.ownerLogin, name: r.name }}
                  className="link link-hover font-medium min-w-0 truncate"
                >
                  {r.nameWithOwner}
                </Link>
                {r.signals.length ? (
                  <span className="badge badge-outline badge-sm shrink-0">
                    {signalLabel(r.signals)}
                  </span>
                ) : null}
                {(r.openIssues != null && r.openIssues > 0) ||
                (r.openPrs != null && r.openPrs > 0) ? (
                  <span className="text-xs opacity-60 shrink-0">
                    {r.openIssues ? `${r.openIssues} assigned` : null}
                    {r.openIssues && r.openPrs ? ' · ' : null}
                    {r.openPrs ? `${r.openPrs} open PRs` : null}
                  </span>
                ) : null}
                <span className="flex gap-2 text-xs ms-auto shrink-0">
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
                <span className="text-xs opacity-50 basis-full">
                  {r.lastActivityAt ? fmtDate(r.lastActivityAt) : null}
                </span>
              </li>
            ))
          ) : (
            <li className="dense-row opacity-60 text-sm">
              No open work yet — assigned issues, review requests, or your PRs
              will show up here.
            </li>
          )}
        </ul>
      </section>

      <Suspense fallback={<LoadingBlock label="Loading more repos…" />}>
        <HomeMoreRepos exclude={activeSet} />
      </Suspense>
    </div>
  );
}
