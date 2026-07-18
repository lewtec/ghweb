import { cn } from '@/lib/cls';

export type ReviewState =
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'COMMENTED'
  | 'DISMISSED'
  | 'PENDING'
  | string;

export type ReviewStateBadgeProps = {
  state: ReviewState;
  /** Override default label (e.g. "Pending review" in the PR header). */
  label?: string;
  className?: string;
};

/**
 * Review verdict chip. Colors follow SPEC §13.1 status badge legend.
 */
export function ReviewStateBadge({
  state,
  label: labelProp,
  className,
}: ReviewStateBadgeProps) {
  let defaultLabel: string;
  let colorClass: string;

  switch (state) {
    case 'APPROVED':
      defaultLabel = 'Approved';
      colorClass = 'badge-success';
      break;
    case 'CHANGES_REQUESTED':
      defaultLabel = 'Changes requested';
      // Active review friction — solid warning (not error)
      colorClass = 'badge-warning text-warning-content';
      break;
    case 'PENDING':
      defaultLabel = 'Pending';
      // Unfinished review draft — lighter warning (outline)
      colorClass = 'badge-outline badge-warning';
      break;
    case 'DISMISSED':
      defaultLabel = 'Dismissed';
      colorClass = 'badge-ghost border border-base-300 opacity-70';
      break;
    case 'COMMENTED':
      defaultLabel = 'Commented';
      colorClass = 'badge-ghost border border-base-300';
      break;
    default:
      defaultLabel = state;
      colorClass = 'badge-ghost border border-base-300';
      break;
  }

  return (
    <span
      className={cn(
        'badge badge-sm font-medium shrink-0',
        colorClass,
        className,
      )}
    >
      {labelProp ?? defaultLabel}
    </span>
  );
}
