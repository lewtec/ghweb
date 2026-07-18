import { cn } from '@/lib/cls';
import {
  checkBadgeClass,
  checkLabel,
  type CheckConclusion,
  type CheckStatus,
} from '@/lib/checkStatus';

type Props = {
  status?: CheckStatus;
  conclusion?: CheckConclusion;
  className?: string;
  /** Override label text */
  label?: string;
};

export function CheckStatusBadge({
  status,
  conclusion,
  className,
  label,
}: Props) {
  return (
    <span
      className={cn(
        'badge badge-sm font-normal capitalize shrink-0',
        checkBadgeClass(status, conclusion),
        className,
      )}
    >
      {label ?? checkLabel(status, conclusion)}
    </span>
  );
}
