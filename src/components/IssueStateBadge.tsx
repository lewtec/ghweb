import { cn } from '@/lib/cls';

type Props = {
  state: string; // OPEN | CLOSED
  className?: string;
};

/**
 * Issue lifecycle chip. Colors follow SPEC §13.1 status badge legend.
 */
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
