import { graphql, useLazyLoadQuery } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import type { UserPageQuery } from './__generated__/UserPageQuery.graphql';
import { ExternalLink } from '@/components/ExternalLink';
import { rememberRepo } from '@/lib/recentRepos';

const query = graphql`
  query UserPageQuery($login: String!) {
    repositoryOwner(login: $login) {
      __typename
      login
      avatarUrl(size: 128)
      url
      repositories(
        first: 40
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: [OWNER]
      ) {
        nodes {
          id
          name
          nameWithOwner
          description
          isPrivate
          stargazerCount
          pushedAt
          primaryLanguage {
            name
            color
          }
          owner {
            login
          }
        }
      }
      ... on User {
        name
        bio
        company
        location
        websiteUrl
      }
      ... on Organization {
        name
        description
        location
        websiteUrl
      }
    }
  }
`;

type Props = { login: string };

export function UserPage({ login }: Props) {
  const data = useLazyLoadQuery<UserPageQuery>(query, { login }, STORE_AND_NETWORK);
  const owner = data.repositoryOwner;

  if (!owner) {
    return (
      <div className="p-[clamp(0.75rem,2vw,1.25rem)] alert alert-warning">
        User or organization not found: @{login}
      </div>
    );
  }

  const displayName =
    ('name' in owner && owner.name) || owner.login;
  const blurb =
    owner.__typename === 'User'
      ? owner.bio
      : owner.__typename === 'Organization'
        ? owner.description
        : null;
  const company =
    owner.__typename === 'User' ? owner.company : null;
  const location = 'location' in owner ? owner.location : null;
  const website =
    'websiteUrl' in owner ? owner.websiteUrl : null;

  const repos =
    owner.repositories?.nodes?.filter(Boolean) ?? [];

  return (
    <div className="w-full min-w-0 p-[clamp(0.75rem,2vw,1.25rem)] max-w-5xl mx-auto space-y-4">
      <div className="flex flex-wrap items-start gap-4">
        <div className="avatar shrink-0">
          <div className="w-20 rounded-full ring ring-base-300 overflow-hidden bg-transparent">
            <img src={owner.avatarUrl} alt="" className="bg-transparent" />
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <h1 className="text-xl font-semibold">
            {displayName}
            {displayName !== owner.login ? (
              <span className="ms-2 font-normal opacity-60">
                @{owner.login}
              </span>
            ) : (
              <span className="opacity-60 font-normal">
                @{owner.login}
              </span>
            )}
          </h1>
          <div className="text-xs opacity-60">
            {owner.__typename === 'Organization'
              ? 'Organization'
              : 'User'}
          </div>
          {blurb ? (
            <p className="text-sm opacity-90 max-w-prose">{blurb}</p>
          ) : null}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-70">
            {company ? <span>{company}</span> : null}
            {location ? <span>{location}</span> : null}
            {website ? (
              <ExternalLink className="link" href={String(website)}>
                {String(website).replace(/^https?:\/\//, '')}
              </ExternalLink>
            ) : null}
            <ExternalLink className="link" href={owner.url}>
              GitHub
            </ExternalLink>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium opacity-60 mb-2">
          Repositories
        </h2>
        {repos.length === 0 ? (
          <div className="opacity-60 text-sm">No public repositories.</div>
        ) : (
          <ul className="border border-base-300 rounded-box divide-y divide-base-300">
            {repos.map((r) => {
              if (!r) return null;
              return (
                <li key={r.id} className="p-3 hover:bg-base-200/50">
                  <Link
                    to="/$owner/$name"
                    params={{
                      owner: r.owner.login,
                      name: r.name,
                    }}
                    className="link link-hover font-medium"
                    onClick={() =>
                      rememberRepo(r.owner.login, r.name)
                    }
                  >
                    {r.name}
                    {r.isPrivate ? (
                      <span className="badge badge-ghost badge-xs ms-2">
                        private
                      </span>
                    ) : null}
                  </Link>
                  {r.description ? (
                    <p className="text-sm opacity-70 mt-0.5 line-clamp-2">
                      {r.description}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-3 text-xs opacity-50 mt-1">
                    {r.primaryLanguage ? (
                      <span className="inline-flex items-center gap-1">
                        <span
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor:
                              r.primaryLanguage.color ?? '#888',
                          }}
                        />
                        {r.primaryLanguage.name}
                      </span>
                    ) : null}
                    <span>★ {r.stargazerCount}</span>
                    {r.pushedAt ? (
                      <span>
                        Updated{' '}
                        {new Date(r.pushedAt).toLocaleDateString()}
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
