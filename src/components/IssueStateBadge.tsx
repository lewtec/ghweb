import { cn } from '@/lib/cls';

type Props = {
  state: string; // OPEN | CLOSED
  className?: string;
};

/** Colored issue status chip (open green / closed red). */
export function IssueStateBadge({ state, className }: Props) {
  const open = state === 'OPEN';
  return (
    <span
      className={cn(
        'badge badge-sm font-medium',
        open ? 'badge-success' : 'badge-error',
        className,
      )}
    >
      {open ? 'Open' : 'Closed'}
    </span>
  );
}
