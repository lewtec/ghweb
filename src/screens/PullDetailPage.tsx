import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PullDetailPageQuery } from './__generated__/PullDetailPageQuery.graphql';
import type { PullDetailPageMergeMutation } from './__generated__/PullDetailPageMergeMutation.graphql';
import type { PullDetailPageCloseMutation } from './__generated__/PullDetailPageCloseMutation.graphql';
import { useToast } from '@/lib/toast';

const query = graphql`
  query PullDetailPageQuery($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        id
        number
        title
        body
        state
        isDraft
        merged
        mergeable
        url
        createdAt
        author {
          login
        }
        baseRefName
        headRefName
        commits(last: 1) {
          nodes {
            commit {
              messageHeadline
              oid
            }
          }
        }
        files(first: 50) {
          nodes {
            path
            additions
            deletions
          }
        }
        reviews(first: 20) {
          nodes {
            id
            state
            author {
              login
            }
            body
            createdAt
          }
        }
        comments(first: 40) {
          nodes {
            id
            body
            createdAt
            author {
              login
            }
          }
        }
      }
    }
  }
`;

const mergeMutation = graphql`
  mutation PullDetailPageMergeMutation($id: ID!) {
    mergePullRequest(input: { pullRequestId: $id, mergeMethod: SQUASH }) {
      pullRequest {
        id
        state
        merged
        mergeable
      }
    }
  }
`;

const closeMutation = graphql`
  mutation PullDetailPageCloseMutation($id: ID!) {
    closePullRequest(input: { pullRequestId: $id }) {
      pullRequest {
        id
        state
        merged
      }
    }
  }
`;

type Props = { owner: string; name: string; number: number };

export function PullDetailPage({ owner, name, number }: Props) {
  const toast = useToast();
  const data = useLazyLoadQuery<PullDetailPageQuery>(query, {
    owner,
    name,
    number,
  });
  const pr = data.repository?.pullRequest;
  const [metaOpen, setMetaOpen] = useState(false);
  const [commitMerge, mergeInFlight] =
    useMutation<PullDetailPageMergeMutation>(mergeMutation);
  const [commitClose, closeInFlight] =
    useMutation<PullDetailPageCloseMutation>(closeMutation);

  if (!pr) {
    return (
      <div className="p-4 alert alert-warning">Pull request not found</div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3rem)] max-w-3xl mx-auto w-full">
      <div className="p-3 md:p-4 space-y-3 flex-1 pb-24">
        <div className="flex flex-wrap gap-2 items-start">
          <h1 className="text-xl font-semibold grow">
            {pr.title}{' '}
            <span className="opacity-50 font-normal">#{pr.number}</span>
          </h1>
          <span className="badge badge-sm">
            {pr.merged ? 'MERGED' : pr.state}
            {pr.isDraft ? ' · draft' : ''}
          </span>
        </div>
        <div className="text-xs opacity-60 font-mono">
          {pr.headRefName} → {pr.baseRefName}
        </div>

        <button
          type="button"
          className="btn btn-xs btn-ghost"
          onClick={() => setMetaOpen((v) => !v)}
        >
          {metaOpen ? 'Hide' : 'Show'} files & reviews
        </button>
        {metaOpen ? (
          <div className="border border-base-300 rounded-box p-3 text-sm space-y-2">
            <div>
              <div className="font-medium text-xs opacity-60 mb-1">Files</div>
              <ul className="dense-list">
                {pr.files?.nodes?.map((f) =>
                  f ? (
                    <li key={f.path} className="font-mono text-xs">
                      {f.path}{' '}
                      <span className="text-success">+{f.additions}</span>{' '}
                      <span className="text-error">-{f.deletions}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
            <div>
              <div className="font-medium text-xs opacity-60 mb-1">Reviews</div>
              <ul>
                {pr.reviews?.nodes?.map((r) =>
                  r ? (
                    <li key={r.id} className="text-xs">
                      @{r.author?.login}: {r.state}
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="border border-base-300 rounded-box p-3">
          <div className="text-xs opacity-60 mb-2">
            @{pr.author?.login ?? 'ghost'} ·{' '}
            {new Date(pr.createdAt).toLocaleString()}
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {pr.body || '_No description_'}
            </ReactMarkdown>
          </div>
        </div>

        {pr.comments?.nodes?.map((c) => {
          if (!c) return null;
          return (
            <div key={c.id} className="border border-base-300 rounded-box p-3">
              <div className="text-xs opacity-60 mb-2">
                @{c.author?.login ?? 'ghost'} ·{' '}
                {new Date(c.createdAt).toLocaleString()}
              </div>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {c.body}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 border-t border-base-300 bg-base-100 p-2 flex flex-wrap gap-2">
        {!pr.merged && pr.state === 'OPEN' ? (
          <>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              disabled={mergeInFlight || pr.mergeable === 'CONFLICTING'}
              onClick={() => {
                commitMerge({
                  variables: { id: pr.id },
                  optimisticResponse: {
                    mergePullRequest: {
                      pullRequest: {
                        id: pr.id,
                        state: 'OPEN',
                        merged: false,
                        mergeable: pr.mergeable,
                      },
                    },
                  },
                  onCompleted: () => toast.info('Merge requested'),
                  onError: (e) => toast.error('Merge failed', e.message),
                });
              }}
            >
              {mergeInFlight ? 'Merging…' : 'Squash merge'}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              disabled={closeInFlight}
              onClick={() => {
                commitClose({
                  variables: { id: pr.id },
                  optimisticResponse: {
                    closePullRequest: {
                      pullRequest: {
                        id: pr.id,
                        state: 'CLOSED',
                        merged: false,
                      },
                    },
                  },
                  onError: (e) => toast.error('Close failed', e.message),
                });
              }}
            >
              Close
            </button>
          </>
        ) : null}
        <a
          className="btn btn-sm btn-ghost ml-auto"
          href={pr.url}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
