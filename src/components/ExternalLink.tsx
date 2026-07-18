import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cls';

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> & {
  href: string;
  children: ReactNode;
};

/**
 * Outside (non-app) links always open in a new browser tab.
 * See SPEC §7.6.
 */
export function ExternalLink({ href, children, className, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...rest}
    >
      {children}
    </a>
  );
}
