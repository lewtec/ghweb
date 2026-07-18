import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  useRelayEnvironment,
  fetchQuery,
} from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ActionsRunPageQuery } from './__generated__/ActionsRunPageQuery.graphql';
import type { ActionsRunPageApproveMutation } from './__generated__/ActionsRunPageApproveMutation.graphql';
import type { ActionsRunPageRejectMutation } from './__generated__/ActionsRunPageRejectMutation.graphql';
import type { ActionsRunPageRerequestMutation } from './__generated__/ActionsRunPageRerequestMutation.graphql';
import { useLiveQuery } from '@/lib/useLiveQuery';
import { CheckStatusBadge } from '@/components/CheckStatusBadge';
import { ActionsGapLink } from '@/components/ActionsGapLink';
import { ExternalLink } from '@/components/ExternalLink';
import { LoadingBlock } from '@/components/LoadingBlock';
import { useToast } from '@/lib/toast';
import {
  fetchActionsJobLogs,
  githubActionsRunUrl,
} from '@/lib/rest';
import {
  anyInProgress,
  isCheckInProgress,
} from '@/lib/checkStatus';
import { cn } from '@/lib/cls';

const query = graphql`
  query ActionsRunPageQuery($id: ID!, $owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
    }
    node(id: $id) {
      __typename
      ... on WorkflowRun {
        id
        databaseId
        runNumber
        runAttempt
        event
        displayTitle
        createdAt
        updatedAt
        url
        workflow {
          id
          name
          state
          url
        }
        checkSuite {
          id
          status
          conclusion
          branch {
            name
          }
          commit {
            abbreviatedOid
            oid
            messageHeadline
          }
          checkRuns(first: 50) {
            nodes {
              id
              databaseId
              name
              status
              conclusion
              startedAt
              completedAt
              detailsUrl
              summary
              title
              text
              steps(first: 80) {
                nodes {
                  name
                  number
                  status
                  conclusion
                  startedAt
                  completedAt
                }
              }
              annotations(first: 30) {
                nodes {
                  message
                  path
                  title
                  annotationLevel
                  location {
                    start {
                      line
                    }
                  }
                }
              }
            }
          }
        }
        pendingDeploymentRequests(first: 20) {
          nodes {
            currentUserCanApprove
            waitTimer
            waitTimerStartedAt
            environment {
              id
              name
            }
          }
        }
        deploymentReviews(first: 10) {
          nodes {
            id
            state
            comment
            user {
              login
            }
          }
        }
      }
    }
  }
`;

const approveMutation = graphql`
  mutation ActionsRunPageApproveMutation(
    $workflowRunId: ID!
    $environmentIds: [ID!]!
    $comment: String
  ) {
    approveDeployments(
      input: {
        workflowRunId: $workflowRunId
        environmentIds: $environmentIds
        comment: $comment
      }
    ) {
      clientMutationId
    }
  }
`;

const rejectMutation = graphql`
  mutation ActionsRunPageRejectMutation(
    $workflowRunId: ID!
    $environmentIds: [ID!]!
    $comment: String
  ) {
    rejectDeployments(
      input: {
        workflowRunId: $workflowRunId
        environmentIds: $environmentIds
        comment: $comment
      }
    ) {
      clientMutationId
    }
  }
`;

const rerequestMutation = graphql`
  mutation ActionsRunPageRerequestMutation(
    $repositoryId: ID!
    $checkSuiteId: ID!
  ) {
    rerequestCheckSuite(
      input: { repositoryId: $repositoryId, checkSuiteId: $checkSuiteId }
    ) {
      checkSuite {
        id
        status
        conclusion
      }
    }
  }
`;

type Props = {
  owner: string;
  name: string;
  /** GraphQL node id of WorkflowRun */
  runId: string;
};

export function ActionsRunPage({ owner, name, runId }: Props) {
  const toast = useToast();
  const env = useRelayEnvironment();
  const variables = { id: runId, owner, name };
  const data = useLazyLoadQuery<ActionsRunPageQuery>(
    query,
    variables,
    STORE_AND_NETWORK,
  );

  const node = data.node;
  const run =
    node && node.__typename === 'WorkflowRun'
      ? node
      : null;

  const checkRuns =
    run?.checkSuite?.checkRuns?.nodes?.filter(Boolean) ?? [];
  const live = anyInProgress([
    run?.checkSuite,
    ...checkRuns,
    ...checkRuns.flatMap(
      (c) => c?.steps?.nodes?.filter(Boolean) ?? [],
    ),
  ]);
  useLiveQuery(query, variables, { active: live });

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const selected =
    checkRuns.find((c) => c && c.id === selectedJobId) ?? checkRuns[0] ?? null;

  useEffect(() => {
    if (!selectedJobId && checkRuns[0]?.id) {
      setSelectedJobId(checkRuns[0].id);
    }
  }, [checkRuns, selectedJobId]);

  const [commitApprove, approveBusy] =
    useMutation<ActionsRunPageApproveMutation>(approveMutation);
  const [commitReject, rejectBusy] =
    useMutation<ActionsRunPageRejectMutation>(rejectMutation);
  const [commitRerequest, rerequestBusy] =
    useMutation<ActionsRunPageRerequestMutation>(rerequestMutation);

  const refresh = useCallback(() => {
    void fetchQuery(env, query, variables, {
      fetchPolicy: 'network-only',
    }).toPromise();
  }, [env, variables]);

  if (!run) {
    return (
      <div className="p-4 alert alert-warning space-y-2">
        <div>Workflow run not found (invalid or expired id).</div>
        <Link
          to="/$owner/$name/actions"
          params={{ owner, name }}
          className="link"
        >
          Back to Actions
        </Link>
      </div>
    );
  }

  const ghRun = githubActionsRunUrl(owner, name, run.databaseId);
  const pending =
    run.pendingDeploymentRequests?.nodes?.filter(Boolean) ?? [];
  const repoId = data.repository?.id;

  return (
    <div className="w-full min-w-0 p-[clamp(0.75rem,2vw,1.25rem)] space-y-3">
      <div className="flex flex-wrap items-start gap-2 justify-between">
        <div className="min-w-0 space-y-1">
          <div className="text-xs opacity-50">
            <Link
              to="/$owner/$name/actions"
              params={{ owner, name }}
              className="link link-hover"
            >
              Actions
            </Link>
            {' / '}
            run
          </div>
          <div className="flex items-start gap-2 w-full min-w-0">
            <h1 className="text-lg font-semibold min-w-0 flex-1 break-words pr-2">
              {run.displayTitle || run.workflow?.name || 'Workflow run'}
            </h1>
            <CheckStatusBadge
              status={run.checkSuite?.status}
              conclusion={run.checkSuite?.conclusion}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs opacity-70">
            <span className="font-mono">
              {run.workflow?.name}
              {run.runNumber != null ? ` #${run.runNumber}` : ''}
              {run.runAttempt != null && run.runAttempt > 1
                ? ` (attempt ${run.runAttempt})`
                : ''}
            </span>
            {run.event ? (
              <span className="badge badge-ghost badge-sm">{run.event}</span>
            ) : null}
            {run.checkSuite?.branch?.name ? (
              <span className="font-mono">{run.checkSuite.branch.name}</span>
            ) : null}
            {run.checkSuite?.commit?.abbreviatedOid ? (
              <span className="font-mono opacity-60">
                {run.checkSuite.commit.abbreviatedOid}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {repoId && run.checkSuite?.id ? (
            <button
              type="button"
              className="btn btn-sm btn-outline"
              disabled={rerequestBusy}
              onClick={() => {
                commitRerequest({
                  variables: {
                    repositoryId: repoId,
                    checkSuiteId: run.checkSuite!.id,
                  },
                  onCompleted: () => {
                    toast.info('Check suite re-requested');
                    refresh();
                  },
                  onError: (e) =>
                    toast.error('Re-request failed', e.message),
                });
              }}
            >
              Re-request checks
            </button>
          ) : null}
          <ActionsGapLink href={ghRun}>Re-run on GitHub</ActionsGapLink>
          <ActionsGapLink href={ghRun}>Cancel on GitHub</ActionsGapLink>
          <ExternalLink className="btn btn-sm btn-ghost" href={run.url || ghRun}>
            GitHub
          </ExternalLink>
        </div>
      </div>

      {pending.length > 0 ? (
        <div className="border border-warning/40 bg-warning/10 rounded-box p-3 space-y-2">
          <div className="text-sm font-medium">Pending deployment reviews</div>
          {pending.map((p, i) => {
            if (!p?.environment) return null;
            const envId = p.environment.id;
            const can = p.currentUserCanApprove;
            return (
              <div
                key={`${envId}-${i}`}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="font-mono">{p.environment.name}</span>
                {p.waitTimer ? (
                  <span className="text-xs opacity-60">
                    wait {p.waitTimer}s
                  </span>
                ) : null}
                {can ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-xs btn-success"
                      disabled={approveBusy}
                      onClick={() => {
                        commitApprove({
                          variables: {
                            workflowRunId: run.id,
                            environmentIds: [envId],
                            comment: '',
                          },
                          onCompleted: () => {
                            toast.info('Deployment approved');
                            refresh();
                          },
                          onError: (e) =>
                            toast.error('Approve failed', e.message),
                        });
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-xs btn-error btn-outline"
                      disabled={rejectBusy}
                      onClick={() => {
                        commitReject({
                          variables: {
                            workflowRunId: run.id,
                            environmentIds: [envId],
                            comment: '',
                          },
                          onCompleted: () => {
                            toast.info('Deployment rejected');
                            refresh();
                          },
                          onError: (e) =>
                            toast.error('Reject failed', e.message),
                        });
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-xs opacity-50">
                    You cannot approve this environment
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-3 lg:grid-cols-[minmax(12rem,18rem)_1fr] min-h-[50vh]">
        <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 dense-list h-fit max-h-[70vh] overflow-auto">
          {checkRuns.length === 0 ? (
            <li className="dense-row text-sm opacity-60">No check runs</li>
          ) : (
            checkRuns.map((c) =>
              c ? (
                <li key={c.id}>
                  <button
                    type="button"
                    className={cn(
                      'dense-row w-full text-left flex items-center gap-2',
                      selected?.id === c.id && 'bg-base-200',
                    )}
                    onClick={() => setSelectedJobId(c.id)}
                  >
                    <span className="truncate text-sm min-w-0 flex-1 pr-2">
                      {c.name}
                    </span>
                    <CheckStatusBadge
                      status={c.status}
                      conclusion={c.conclusion}
                    />
                  </button>
                </li>
              ) : null,
            )
          )}
        </ul>

        <div className="min-w-0 space-y-3">
          {selected ? (
            <>
              <div className="flex flex-wrap items-center gap-2 w-full">
                <h2 className="font-medium min-w-0 flex-1 pr-2">
                  {selected.name}
                </h2>
                <CheckStatusBadge
                  status={selected.status}
                  conclusion={selected.conclusion}
                />
                {selected.detailsUrl ? (
                  <ExternalLink
                    className="btn btn-xs btn-ghost"
                    href={String(selected.detailsUrl)}
                  >
                    Details
                  </ExternalLink>
                ) : null}
              </div>
              {selected.summary || selected.title ? (
                <div className="text-sm opacity-80 whitespace-pre-wrap">
                  {selected.title ? (
                    <div className="font-medium">{selected.title}</div>
                  ) : null}
                  {selected.summary}
                </div>
              ) : null}

              <div>
                <div className="text-xs font-medium opacity-60 mb-1">Steps</div>
                <ul className="text-xs border border-base-300 rounded-box divide-y divide-base-300">
                  {(selected.steps?.nodes ?? []).map((s) =>
                    s ? (
                      <li
                        key={s.number}
                        className="flex items-center gap-2 px-2 py-1 w-full min-w-0"
                      >
                        <span className="opacity-40 font-mono w-6 shrink-0">
                          {s.number}
                        </span>
                        <span className="truncate flex-1 min-w-0 pr-2">
                          {s.name}
                        </span>
                        <CheckStatusBadge
                          status={s.status}
                          conclusion={s.conclusion}
                        />
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>

              {(selected.annotations?.nodes?.length ?? 0) > 0 ? (
                <div>
                  <div className="text-xs font-medium opacity-60 mb-1">
                    Annotations
                  </div>
                  <ul className="text-xs space-y-1">
                    {selected.annotations?.nodes?.map((a, i) =>
                      a ? (
                        <li
                          key={i}
                          className="border border-base-300 rounded px-2 py-1"
                        >
                          <span className="badge badge-xs me-1">
                            {a.annotationLevel ?? 'note'}
                          </span>
                          <span className="font-mono opacity-60">
                            {a.path}
                            {a.location?.start?.line != null
                              ? `:${a.location.start.line}`
                              : ''}
                          </span>
                          <div>{a.message}</div>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </div>
              ) : null}

              <JobLogPanel
                owner={owner}
                name={name}
                jobDatabaseId={selected.databaseId ?? null}
                jobInProgress={isCheckInProgress(selected.status)}
                githubRunUrl={ghRun}
              />
            </>
          ) : (
            <p className="text-sm opacity-50">Select a job</p>
          )}
        </div>
      </div>
    </div>
  );
}

function JobLogPanel({
  owner,
  name,
  jobDatabaseId,
  jobInProgress,
  githubRunUrl,
}: {
  owner: string;
  name: string;
  jobDatabaseId: number | null;
  jobInProgress: boolean;
  githubRunUrl: string;
}) {
  const [logs, setLogs] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (jobDatabaseId == null) {
      setErr(null);
      setLogs(null);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const text = await fetchActionsJobLogs(owner, name, jobDatabaseId);
      setLogs(text);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setLogs(null);
    } finally {
      setLoading(false);
    }
  }, [owner, name, jobDatabaseId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Soft “stream”: re-fetch logs while job is in progress
  useEffect(() => {
    if (!jobInProgress || jobDatabaseId == null) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') void load();
    }, 5000);
    return () => window.clearInterval(id);
  }, [jobInProgress, jobDatabaseId, load]);

  const display = useMemo(() => {
    if (!logs) return '';
    // Keep last ~400KB for UI
    if (logs.length > 400_000) return logs.slice(-400_000);
    return logs;
  }, [logs]);

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs font-medium opacity-60">Logs</div>
        <button
          type="button"
          className="btn btn-xs btn-ghost"
          disabled={loading || jobDatabaseId == null}
          onClick={() => void load()}
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
        {jobInProgress ? (
          <span className="text-[0.65rem] opacity-50">
            auto-refresh while in progress
          </span>
        ) : null}
        <ActionsGapLink
          href={githubRunUrl}
          className="btn btn-xs btn-ghost"
        >
          Full logs on GitHub
        </ActionsGapLink>
      </div>
      {jobDatabaseId == null ? (
        <p className="text-xs opacity-50">
          No job database id — open on GitHub for logs.
        </p>
      ) : err ? (
        <div className="alert alert-warning text-xs py-2">
          {err}{' '}
          <ExternalLink className="link" href={githubRunUrl}>
            GitHub
          </ExternalLink>
        </div>
      ) : loading && !logs ? (
        <LoadingBlock label="Fetching logs…" />
      ) : (
        <pre className="text-[0.7rem] leading-snug font-mono bg-neutral text-neutral-content p-2 rounded-box overflow-auto max-h-[min(50vh,28rem)] whitespace-pre-wrap break-all">
          {display || '(empty)'}
        </pre>
      )}
    </div>
  );
}
