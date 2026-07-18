import { graphql, useLazyLoadQuery } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import type { SearchPageQuery } from './__generated__/SearchPageQuery.graphql';

const query = graphql`
  query SearchPageQuery($q: String!) {
    search(query: $q, type: ISSUE, first: 25) {
      issueCount
      nodes {
        __typename
        ... on Issue {
          id
          number
          title
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
    repoSearch: search(query: $q, type: REPOSITORY, first: 15) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          nameWithOwner
          name
          owner {
            login
          }
          description
        }
      }
    }
  }
`;

type Props = { q: string };

export function SearchPage({ q }: Props) {
  const data = useLazyLoadQuery<SearchPageQuery>(
    query,
    { q: q || 'is:open' },
    { ...STORE_AND_NETWORK, fetchKey: q },
  );

  return (
    <div className="p-3 md:p-4 max-w-3xl space-y-6">
      <h1 className="text-lg font-semibold">Search</h1>
      <p className="text-sm opacity-60 font-mono break-all">{q || '(empty)'}</p>

      <section>
        <h2 className="text-sm font-semibold opacity-60 mb-2">
          Repositories ({data.repoSearch.repositoryCount})
        </h2>
        <ul className="card border border-base-300 divide-y divide-base-300 dense-list">
          {data.repoSearch.nodes?.map((n) => {
            if (!n || !('nameWithOwner' in n) || !n.owner || !n.name) return null;
            return (
              <li key={n.id} className="dense-row">
                <Link
                  to="/$owner/$name"
                  params={{ owner: n.owner.login, name: n.name }}
                  className="link link-hover font-medium"
                >
                  {n.nameWithOwner}
                </Link>
                {n.description ? (
                  <div className="text-xs opacity-60">{n.description}</div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold opacity-60 mb-2">
          Issues & PRs ({data.search.issueCount})
        </h2>
        <ul className="card border border-base-300 divide-y divide-base-300 dense-list">
          {data.search.nodes?.map((n) => {
            if (!n || !('number' in n) || !n.repository) return null;
            const isPr = n.__typename === 'PullRequest';
            return (
              <li key={n.id} className="dense-row">
                <Link
                  to={
                    isPr
                      ? '/$owner/$name/pull/$number'
                      : '/$owner/$name/issues/$number'
                  }
                  params={{
                    owner: n.repository.owner.login,
                    name: n.repository.name,
                    number: String(n.number),
                  }}
                  className="link link-hover"
                >
                  <span className="opacity-50 text-xs">
                    {n.repository.nameWithOwner}
                    {isPr ? ' PR' : ' #'}
                    {n.number}
                  </span>{' '}
                  {n.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
