import type { MouseEvent, ReactNode } from 'react';
import { useToast } from '@/lib/toast';
import { copyText as writeClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/cls';

type Props = {
  /** Issue or PR number */
  number: number | string;
  /** Text written to the clipboard (default bare number, no `#`) */
  copyText?: string;
  className?: string;
  title?: string;
  children?: ReactNode;
};

/**
 * Clickable issue/PR number that copies the bare number to the clipboard.
 * Display stays `#N`; stopPropagation so it works inside list row links.
 */
export function CopyableNumber({
  number,
  copyText,
  className,
  title,
  children,
}: Props) {
  const toast = useToast();
  const text = copyText ?? String(number);
  const label = children ?? `#${number}`;

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await writeClipboard(text);
    if (ok) toast.info(`Copied ${text}`);
    else toast.error('Could not copy', 'Clipboard is not available here');
  };

  return (
    <button
      type="button"
      className={cn(
        'inline align-baseline cursor-pointer hover:underline underline-offset-2',
        'bg-transparent border-0 p-0 m-0 font-inherit text-inherit',
        className,
      )}
      title={title ?? `Copy ${text}`}
      aria-label={`Copy number ${text}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
