import { cn } from '@/lib/cls';

export type PrStateBadgeProps = {
  state: string; // OPEN | CLOSED | MERGED
  merged?: boolean | null;
  isDraft?: boolean | null;
  /** Transient UI while merge mutation is in flight */
  merging?: boolean;
  className?: string;
};

/**
 * PR lifecycle chip. Colors follow SPEC §13.1 status badge legend.
 */
export function PrStateBadge({
  state,
  merged,
  isDraft,
  merging,
  className,
}: PrStateBadgeProps) {
  let label: string;
  let colorClass: string;

  if (merging) {
    label = 'Merging…';
    // WIP / in progress
    colorClass = 'badge-info text-info-content';
  } else if (merged || state === 'MERGED') {
    label = 'Merged';
    // Only non-daisy exception (GitHub purple muscle memory)
    colorClass = 'border-transparent bg-[#8250df] text-white';
  } else if (state === 'CLOSED') {
    label = 'Closed';
    colorClass = 'badge-error';
  } else if (isDraft) {
    label = 'Draft';
    colorClass = 'badge-ghost border border-base-300';
  } else {
    label = 'Open';
    colorClass = 'badge-success';
  }

  return (
    <span className={cn('badge badge-sm font-medium', colorClass, className)}>
      {label}
    </span>
  );
}
