import type { ReactNode } from 'react';
import { ExternalLink } from '@/components/ExternalLink';
import { cn } from '@/lib/cls';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
};

/**
 * Affordance for Actions features GraphQL cannot do — open on GitHub (SPEC §5.4).
 */
export function ActionsGapLink({ href, children, className, title }: Props) {
  return (
    <ExternalLink
      href={href}
      title={title ?? 'Opens on GitHub (not available via GraphQL yet)'}
      className={cn('btn btn-sm btn-ghost', className)}
    >
      {children}
    </ExternalLink>
  );
}
