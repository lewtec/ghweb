import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import {
  TRIAGE,
  TRIAGE_PAGE_SIZE,
  TRIAGE_SEARCH_CAP,
  type TriageKind,
} from '@/lib/triage';
import type { TriageListPageQuery } from './__generated__/TriageListPageQuery.graphql';
import type { TriageListPage_search$key } from './__generated__/TriageListPage_search.graphql';

const searchFragment = graphql`
  fragment TriageListPage_search on Query
  @refetchable(queryName: "TriageListPagePaginationQuery")
  @argumentDefinitions(
    q: { type: "String!" }
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 40 }
  ) {
    search(query: $q, type: ISSUE, first: $count, after: $cursor)
      @connection(key: "TriageListPage_search") {
      issueCount
      edges {
        node {
          __typename
          ... on Issue {
            id
            number
            title
            updatedAt
            repository {
              nameWithOwner
              name
              owner {
                login
              }
            }
          }
          ... on PullRequest {
            id
            number
            title
            updatedAt
            isDraft
            repository {
              nameWithOwner
              name
              owner {
                login
              }
            }
          }
        }
      }
    }
  }
`;

const query = graphql`
  query TriageListPageQuery($q: String!) {
    ...TriageListPage_search @arguments(q: $q)
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

type Props = { kind: TriageKind };

function TriageList({
  queryKey,
  kind,
}: {
  queryKey: TriageListPage_search$key;
  kind: TriageKind;
}) {
  const spec = TRIAGE[kind];
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    searchFragment,
    queryKey,
  );
  const edges = data.search.edges ?? [];
  const items = edges.flatMap((e) => {
    const n = e?.node;
    if (!n || !('number' in n) || !n.repository) return [];
    return [n];
  });
  const shown = items.length;
  const total = data.search.issueCount;

  return (
    <div className="w-full min-w-0 p-[clamp(0.75rem,2vw,1.25rem)]">
      <h1 className="text-lg font-semibold mb-1">
        {spec.title} ({total})
      </h1>
      <p className="text-xs opacity-50 mb-3">
        {shown} / {total}
        {total > TRIAGE_SEARCH_CAP
          ? ' · GitHub search stops at 1000 results.'
          : null}
      </p>
      <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 dense-list w-full">
        {items.map((n) => {
          const isPr = n.__typename === 'PullRequest';
          return (
            <li
              key={n.id}
              className="dense-row flex flex-wrap items-baseline gap-x-3 gap-y-1 w-full min-w-0"
            >
              {isPr ? (
                <Link
                  to="/$owner/$name/pull/$number"
                  params={{
                    owner: n.repository.owner.login,
                    name: n.repository.name,
                    number: String(n.number),
                  }}
                  className="link link-hover min-w-0 flex-1"
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
              ) : (
                <Link
                  to="/$owner/$name/issues/$number"
                  params={{
                    owner: n.repository.owner.login,
                    name: n.repository.name,
                    number: String(n.number),
                  }}
                  className="link link-hover min-w-0 flex-1"
                >
                  <span className="opacity-60 text-xs me-1">
                    {n.repository.nameWithOwner}#{n.number}
                  </span>
                  {n.title}
                </Link>
              )}
              <span className="text-xs opacity-50 shrink-0 ms-auto">
                {fmtDate(n.updatedAt)}
              </span>
            </li>
          );
        })}
        {!items.length ? (
          <li className="dense-row opacity-60 text-sm">None open</li>
        ) : null}
      </ul>
      {hasNext ? (
        <button
          type="button"
          className="btn btn-ghost btn-sm mt-2"
          disabled={isLoadingNext}
          onClick={() => loadNext(TRIAGE_PAGE_SIZE)}
        >
          {isLoadingNext ? 'Loading…' : 'Load more'}
        </button>
      ) : null}
    </div>
  );
}

export function TriageListPage({ kind }: Props) {
  const spec = TRIAGE[kind];
  const data = useLazyLoadQuery<TriageListPageQuery>(
    query,
    { q: spec.searchQuery },
    STORE_AND_NETWORK,
  );
  return <TriageList key={kind} queryKey={data} kind={kind} />;
}
