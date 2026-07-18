import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { IssueDetailPageQuery } from './__generated__/IssueDetailPageQuery.graphql';
import type { IssueDetailPageCloseMutation } from './__generated__/IssueDetailPageCloseMutation.graphql';
import type { IssueDetailPageReopenMutation } from './__generated__/IssueDetailPageReopenMutation.graphql';
import type { IssueDetailPageCommentMutation } from './__generated__/IssueDetailPageCommentMutation.graphql';
import { useToast } from '@/lib/toast';

const query = graphql`
  query IssueDetailPageQuery(
    $owner: String!
    $name: String!
    $number: Int!
  ) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        body
        state
        stateReason
        createdAt
        updatedAt
        closedAt
        url
        author {
          login
          avatarUrl
        }
        labels(first: 20) {
          nodes {
            id
            name
            color
          }
        }
        assignees(first: 10) {
          nodes {
            id
            login
            avatarUrl
          }
        }
        comments(first: 50) {
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

const closeMutation = graphql`
  mutation IssueDetailPageCloseMutation($id: ID!) {
    closeIssue(input: { issueId: $id }) {
      issue {
        id
        state
        stateReason
        closedAt
      }
    }
  }
`;

const reopenMutation = graphql`
  mutation IssueDetailPageReopenMutation($id: ID!) {
    reopenIssue(input: { issueId: $id }) {
      issue {
        id
        state
        stateReason
        closedAt
      }
    }
  }
`;

const commentMutation = graphql`
  mutation IssueDetailPageCommentMutation($id: ID!, $body: String!) {
    addComment(input: { subjectId: $id, body: $body }) {
      commentEdge {
        node {
          id
          body
          createdAt
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;

type Props = { owner: string; name: string; number: number };

export function IssueDetailPage({ owner, name, number }: Props) {
  const toast = useToast();
  const data = useLazyLoadQuery<IssueDetailPageQuery>(
    query,
    { owner, name, number },
    { fetchPolicy: 'store-and-network' },
  );
  const issue = data.repository?.issue;
  const [body, setBody] = useState('');
  const [metaOpen, setMetaOpen] = useState(false);

  const [commitClose, closeInFlight] =
    useMutation<IssueDetailPageCloseMutation>(closeMutation);
  const [commitReopen, reopenInFlight] =
    useMutation<IssueDetailPageReopenMutation>(reopenMutation);
  const [commitComment, commentInFlight] =
    useMutation<IssueDetailPageCommentMutation>(commentMutation);

  if (!issue) {
    return (
      <div className="p-4 alert alert-warning">
        Issue not found.{' '}
        <a
          className="link"
          href={`https://github.com/${owner}/${name}/issues/${number}`}
          target="_blank"
          rel="noreferrer"
        >
          Open on GitHub
        </a>
      </div>
    );
  }

  const open = issue.state === 'OPEN';

  return (
    <div className="flex flex-col min-h-[calc(100vh-3rem)] max-w-3xl mx-auto w-full">
      <div className="p-3 md:p-4 space-y-3 flex-1 pb-24">
        <div className="flex flex-wrap items-start gap-2">
          <h1 className="text-xl font-semibold grow">
            {issue.title}{' '}
            <span className="opacity-50 font-normal">#{issue.number}</span>
          </h1>
          <span
            className={`badge ${open ? 'badge-success' : 'badge-ghost'}`}
          >
            {issue.state}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-xs btn-ghost"
          onClick={() => setMetaOpen((v) => !v)}
        >
          {metaOpen ? 'Hide' : 'Show'} labels & assignees
        </button>
        {metaOpen ? (
          <div className="text-sm space-y-2 border border-base-300 rounded-box p-3">
            <div className="flex flex-wrap gap-1">
              {issue.labels?.nodes?.map((l) =>
                l ? (
                  <span key={l.id} className="badge badge-outline badge-sm">
                    {l.name}
                  </span>
                ) : null,
              )}
              {!issue.labels?.nodes?.length ? (
                <span className="opacity-50">No labels</span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {issue.assignees?.nodes?.map((a) =>
                a ? (
                  <span key={a.id} className="text-xs">
                    @{a.login}
                  </span>
                ) : null,
              )}
              {!issue.assignees?.nodes?.length ? (
                <span className="opacity-50 text-xs">No assignees</span>
              ) : null}
            </div>
            <a className="link text-xs" href={issue.url} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </div>
        ) : (
          <div className="text-xs opacity-60">
            {(issue.labels?.nodes?.length ?? 0) > 0
              ? issue.labels!.nodes!.map((l) => l?.name).filter(Boolean).join(', ')
              : 'No labels'}
            {' · '}
            {(issue.assignees?.nodes?.length ?? 0) > 0
              ? issue.assignees!.nodes!.map((a) => a?.login).filter(Boolean).join(', ')
              : 'unassigned'}
          </div>
        )}

        <div className="border border-base-300 rounded-box p-3">
          <div className="text-xs opacity-60 mb-2">
            @{issue.author?.login ?? 'ghost'} ·{' '}
            {new Date(issue.createdAt).toLocaleString()}
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue.body || '_No description_'}
            </ReactMarkdown>
          </div>
        </div>

        <div className="space-y-3">
          {issue.comments?.nodes?.map((c) => {
            if (!c) return null;
            return (
              <div
                key={c.id}
                className="border border-base-300 rounded-box p-3"
              >
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

        <div className="space-y-2">
          <textarea
            className="textarea textarea-bordered w-full min-h-24"
            placeholder="Comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!body.trim() || commentInFlight}
            onClick={() => {
              commitComment({
                variables: { id: issue.id, body: body.trim() },
                onCompleted: () => {
                  setBody('');
                  toast.info('Comment added — refresh if it is not visible yet');
                },
                onError: (e) => toast.error('Comment failed', e.message),
                updater: (store) => {
                  // rely on refetch via store-and-network on remount; simple invalidate
                  const rec = store.get(issue.id);
                  rec?.invalidateRecord();
                },
              });
            }}
          >
            Comment
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-base-300 bg-base-100 p-2 flex gap-2 safe-area">
        {open ? (
          <button
            type="button"
            className="btn btn-sm"
            disabled={closeInFlight}
            onClick={() => {
              commitClose({
                variables: { id: issue.id },
                optimisticResponse: {
                  closeIssue: {
                    issue: {
                      id: issue.id,
                      state: 'CLOSED',
                      stateReason: 'COMPLETED',
                      closedAt: new Date().toISOString(),
                    },
                  },
                },
                onError: (e) => toast.error('Close failed', e.message),
              });
            }}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm"
            disabled={reopenInFlight}
            onClick={() => {
              commitReopen({
                variables: { id: issue.id },
                optimisticResponse: {
                  reopenIssue: {
                    issue: {
                      id: issue.id,
                      state: 'OPEN',
                      stateReason: null,
                      closedAt: null,
                    },
                  },
                },
                onError: (e) => toast.error('Reopen failed', e.message),
              });
            }}
          >
            Reopen
          </button>
        )}
        <a
          className="btn btn-sm btn-ghost ml-auto"
          href={issue.url}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
