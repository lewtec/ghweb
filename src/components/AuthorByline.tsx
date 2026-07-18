import { cn } from '@/lib/cls';

export type AuthorInfo = {
  login?: string | null;
  avatarUrl?: string | null;
  /** Display name when author is a User */
  name?: string | null;
} | null;

type Props = {
  author: AuthorInfo;
  /** e.g. createdAt string to show after the identity */
  meta?: string;
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Avatar + display name + @handle for issue/PR authors (and similar).
 */
export function AuthorByline({
  author,
  meta,
  size = 'sm',
  className,
}: Props) {
  const login = author?.login ?? 'ghost';
  const name = author?.name?.trim() || null;
  const avatar = author?.avatarUrl ?? null;
  // rem-based avatar via size utilities (1rem = 16px default)
  const px = size === 'md' ? 'size-10' : 'size-7';
  const text = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className={cn('flex items-center gap-2 min-w-0 w-full', className)}>
      <div className={cn('avatar shrink-0', !avatar && 'placeholder')}>
        <div
          className={cn('rounded-full bg-neutral text-neutral-content', px)}
        >
          {avatar ? (
            <img src={avatar} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-[0.65em]">
              {login[0]?.toUpperCase() ?? '?'}
            </span>
          )}
        </div>
      </div>
      <div className={cn('min-w-0 flex-1 leading-tight', text)}>
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 min-w-0">
          {name ? (
            <span className="font-medium truncate min-w-0 max-w-[min(100%,12ch)] sm:max-w-[min(100%,20ch)]">
              {name}
            </span>
          ) : null}
          <span
            className={cn(
              'truncate min-w-0',
              name ? 'opacity-60' : 'font-medium',
            )}
          >
            @{login}
          </span>
        </div>
        {meta ? <div className="opacity-50 truncate min-w-0">{meta}</div> : null}
      </div>
    </div>
  );
}
