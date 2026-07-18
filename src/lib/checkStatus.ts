/** Check / workflow status helpers (GitHub GraphQL enums). */

export type CheckStatus =
  | 'REQUESTED'
  | 'QUEUED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'WAITING'
  | 'PENDING'
  | string
  | null
  | undefined;

export type CheckConclusion =
  | 'ACTION_REQUIRED'
  | 'CANCELLED'
  | 'FAILURE'
  | 'NEUTRAL'
  | 'SKIPPED'
  | 'STALE'
  | 'STARTUP_FAILURE'
  | 'SUCCESS'
  | 'TIMED_OUT'
  | string
  | null
  | undefined;

const NON_TERMINAL_STATUS = new Set([
  'REQUESTED',
  'QUEUED',
  'IN_PROGRESS',
  'WAITING',
  'PENDING',
]);

export function isCheckInProgress(status: CheckStatus): boolean {
  return status != null && NON_TERMINAL_STATUS.has(String(status));
}

/** DaisyUI badge class for check status/conclusion (SPEC §13.1-ish). */
export function checkBadgeClass(
  status: CheckStatus,
  conclusion: CheckConclusion,
): string {
  if (isCheckInProgress(status)) {
    return 'badge-info';
  }
  switch (conclusion) {
    case 'SUCCESS':
      return 'badge-success';
    case 'FAILURE':
    case 'TIMED_OUT':
    case 'STARTUP_FAILURE':
    case 'CANCELLED':
      return 'badge-error';
    case 'ACTION_REQUIRED':
      return 'badge-warning';
    case 'NEUTRAL':
    case 'SKIPPED':
    case 'STALE':
      return 'badge-ghost';
    default:
      return 'badge-ghost';
  }
}

export function checkLabel(
  status: CheckStatus,
  conclusion: CheckConclusion,
): string {
  if (isCheckInProgress(status)) {
    return String(status)
      .toLowerCase()
      .replace(/_/g, ' ');
  }
  if (conclusion) {
    return String(conclusion)
      .toLowerCase()
      .replace(/_/g, ' ');
  }
  return 'unknown';
}

export function anyInProgress(
  items: ReadonlyArray<{ status?: CheckStatus } | null | undefined>,
): boolean {
  return items.some((i) => i && isCheckInProgress(i.status));
}
