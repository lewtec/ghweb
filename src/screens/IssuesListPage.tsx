import { graphql, useLazyLoadQuery } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import { AuthorByline } from '@/components/AuthorByline';
import { IssueStateBadge } from '@/components/IssueStateBadge';
import type { IssuesListPageQuery } from './__generated__/IssuesListPageQuery.graphql';

const query = graphql`
  query IssuesListPageQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(
        first: 40
        states: OPEN
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          id
          number
          title
          state
          updatedAt
          author {
            login
            avatarUrl(size: 40)
            ... on User {
              name
            }
          }
          labels(first: 5) {
            nodes {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`;

type Props = { owner: string; name: string };

export function IssuesListPage({ owner, name }: Props) {
  const data = useLazyLoadQuery<IssuesListPageQuery>(query, { owner, name }, STORE_AND_NETWORK);
  const issues = data.repository?.issues.nodes ?? [];

  return (
    <div className="w-full min-w-0 p-[clamp(0.75rem,2vw,1.25rem)]">
      <h1 className="text-lg font-semibold mb-3">Issues</h1>
      <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 dense-list w-full">
        {issues.map((issue) => {
          if (!issue) return null;
          return (
            <li key={issue.id} className="dense-row w-full">
              <div className="flex items-start gap-2 w-full">
                <Link
                  to="/$owner/$name/issues/$number"
                  params={{ owner, name, number: String(issue.number) }}
                  className="link link-hover font-medium min-w-0 flex-1 pr-2"
                >
                  <span className="opacity-50 font-normal">#{issue.number}</span>{' '}
                  {issue.title}
                </Link>
                <IssueStateBadge className="shrink-0" state={issue.state} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <AuthorByline
                  author={
                    issue.author
                      ? {
                          login: issue.author.login,
                          avatarUrl: issue.author.avatarUrl,
                          name:
                            'name' in issue.author
                              ? (issue.author.name as string | null)
                              : null,
                        }
                      : null
                  }
                  meta={new Date(issue.updatedAt).toLocaleString()}
                />
                {issue.labels?.nodes?.filter(Boolean).length ? (
                  <div className="flex flex-wrap gap-1">
                    {issue.labels.nodes.map((l) =>
                      l ? (
                        <span
                          key={l.id}
                          className="badge badge-outline badge-xs"
                          style={
                            l.color
                              ? { borderColor: `#${l.color}` }
                              : undefined
                          }
                        >
                          {l.name}
                        </span>
                      ) : null,
                    )}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
        {!issues.length ? (
          <li className="dense-row opacity-60">No open issues</li>
        ) : null}
      </ul>
    </div>
  );
}
