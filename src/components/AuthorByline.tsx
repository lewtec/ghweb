import { cn } from '@/lib/cls';

export type AuthorInfo = {
  login?: string | null;
  avatarUrl?: string | null;
  /** Display name when author is a User */
  name?: string | null;
} | null;

/** Map a Relay actor (User has `name`; Bot and others may not) onto AuthorByline. */
export function authorFromActor<
  T extends { login: string; avatarUrl?: string | null },
>(actor: T | null | undefined): AuthorInfo {
  if (!actor) return null;
  const name =
    'name' in actor
      ? ((actor as T & { name?: string | null }).name ?? null)
      : null;
  return {
    login: actor.login,
    avatarUrl: actor.avatarUrl ?? null,
    name,
  };
}

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
          className={cn(
            'rounded-full overflow-hidden',
            px,
            // Only placeholders need a solid fill — real avatars (users/bots)
            // may be transparent PNGs; bg-neutral would show as a black disc.
            avatar
              ? 'bg-transparent'
              : 'bg-neutral text-neutral-content',
          )}
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="size-full object-cover bg-transparent"
            />
          ) : (
            <span className="text-[0.65em]">
              {login[0]?.toUpperCase() ?? '?'}
            </span>
          )}
        </div>
      </div>
      <div className={cn('min-w-0 flex-1 leading-tight', text)}>
        <div
          className="truncate min-w-0"
          title={name ? `${name} (@${login})` : `@${login}`}
        >
          {name ? <span className="font-medium">{name}</span> : null}
          {name ? ' ' : null}
          <span className={name ? 'opacity-60' : 'font-medium'}>@{login}</span>
        </div>
        {meta ? (
          <div className="opacity-50 truncate min-w-0" title={meta}>
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  );
}
