import { graphql, useLazyLoadQuery } from 'react-relay';
import { STORE_AND_NETWORK } from '@/lib/relayPolicy';
import { Link } from '@tanstack/react-router';
import type { PrChecksStripQuery } from './__generated__/PrChecksStripQuery.graphql';
import { useLiveQuery } from '@/lib/useLiveQuery';
import { CheckStatusBadge } from '@/components/CheckStatusBadge';
import { anyInProgress } from '@/lib/checkStatus';
import { cn } from '@/lib/cls';

const query = graphql`
  query PrChecksStripQuery(
    $owner: String!
    $name: String!
    $number: Int!
  ) {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        statusCheckRollup {
          state
          contexts(first: 40) {
            nodes {
              __typename
              ... on CheckRun {
                id
                name
                status
                conclusion
                checkSuite {
                  workflowRun {
                    id
                    databaseId
                    runNumber
                    displayTitle
                    workflow {
                      name
                    }
                  }
                }
              }
              ... on StatusContext {
                id
                context
                state
                description
                targetUrl
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {
  owner: string;
  name: string;
  number: number;
  className?: string;
};

export function PrChecksStrip({ owner, name, number, className }: Props) {
  const variables = { owner, name, number };
  const data = useLazyLoadQuery<PrChecksStripQuery>(
    query,
    variables,
    STORE_AND_NETWORK,
  );
  const rollup = data.repository?.pullRequest?.statusCheckRollup;
  const nodes = rollup?.contexts?.nodes?.filter(Boolean) ?? [];
  const live = anyInProgress(
    nodes.map((n) =>
      n && n.__typename === 'CheckRun'
        ? { status: n.status }
        : { status: n && 'state' in n ? mapStatusContext(n.state) : null },
    ),
  );
  useLiveQuery(query, variables, { active: live });

  if (!rollup || nodes.length === 0) return null;

  return (
    <div
      className={cn(
        'border border-base-300 rounded-box p-2 space-y-1.5',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium opacity-70">Checks</span>
        <CheckStatusBadge
          status={
            rollup.state === 'PENDING' || rollup.state === 'EXPECTED'
              ? 'IN_PROGRESS'
              : 'COMPLETED'
          }
          conclusion={mapRollupConclusion(rollup.state)}
          label={String(rollup.state).toLowerCase().replace(/_/g, ' ')}
        />
        <Link
          to="/$owner/$name/actions"
          params={{ owner, name }}
          className="link link-hover opacity-60 ms-auto"
        >
          All Actions
        </Link>
      </div>
      <ul className="space-y-0.5 max-h-48 overflow-auto">
        {nodes.map((n) => {
          if (!n) return null;
          if (n.__typename === 'CheckRun') {
            const runId = n.checkSuite?.workflowRun?.id;
            const row = (
              <div className="flex items-center gap-2 text-xs min-w-0 w-full">
                <span className="truncate min-w-0 flex-1 pr-2">
                  {n.name}
                  {n.checkSuite?.workflowRun?.workflow?.name ? (
                    <span className="opacity-40 font-mono ms-1.5 hidden sm:inline">
                      {n.checkSuite.workflowRun.workflow.name}
                    </span>
                  ) : null}
                </span>
                <CheckStatusBadge
                  status={n.status}
                  conclusion={n.conclusion}
                />
              </div>
            );
            return (
              <li key={n.id}>
                {runId ? (
                  <Link
                    to="/$owner/$name/actions/runs/$runId"
                    params={{ owner, name, runId }}
                    className="block hover:bg-base-200/50 rounded px-1 -mx-1"
                  >
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            );
          }
          if (n.__typename === 'StatusContext') {
            return (
              <li
                key={n.id}
                className="flex items-center gap-2 text-xs px-1 w-full min-w-0"
              >
                <span className="truncate min-w-0 flex-1 pr-2">
                  {n.context}
                </span>
                <CheckStatusBadge
                  status={
                    n.state === 'PENDING' || n.state === 'EXPECTED'
                      ? 'PENDING'
                      : 'COMPLETED'
                  }
                  conclusion={
                    n.state === 'SUCCESS'
                      ? 'SUCCESS'
                      : n.state === 'FAILURE' || n.state === 'ERROR'
                        ? 'FAILURE'
                        : 'NEUTRAL'
                  }
                  label={String(n.state).toLowerCase()}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

function mapRollupConclusion(
  state: string | null | undefined,
): string | null {
  switch (state) {
    case 'SUCCESS':
      return 'SUCCESS';
    case 'FAILURE':
    case 'ERROR':
      return 'FAILURE';
    case 'PENDING':
    case 'EXPECTED':
      return null;
    default:
      return 'NEUTRAL';
  }
}

function mapStatusContext(state: string | null | undefined): string {
  if (state === 'PENDING' || state === 'EXPECTED') return 'PENDING';
  return 'COMPLETED';
}
