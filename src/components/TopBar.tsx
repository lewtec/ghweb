import { Link } from '@tanstack/react-router';
import { Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clearToken } from '@/lib/auth';
import {
  getThemePreference,
  setThemePreference,
  type ThemePreference,
} from '@/lib/theme';
import { subscribeRateLimit, type RateLimitSnapshot } from '@/relay/environment';
import { cn } from '@/lib/cls';

type Props = {
  onOpenPalette: () => void;
  onOpenNav?: () => void;
  contextLabel?: string;
  viewerLogin?: string | null;
  viewerAvatarUrl?: string | null;
  signedIn: boolean;
  onSignedOut: () => void;
};

export function TopBar({
  onOpenPalette,
  onOpenNav,
  contextLabel,
  viewerLogin,
  viewerAvatarUrl,
  signedIn,
  onSignedOut,
}: Props) {
  const [theme, setTheme] = useState<ThemePreference>(getThemePreference);
  const [rl, setRl] = useState<RateLimitSnapshot | null>(null);

  useEffect(() => subscribeRateLimit(setRl), []);

  return (
    <header className="navbar min-h-12 bg-base-200 border-b border-base-300 px-2 gap-1 sticky top-0 z-40">
      {onOpenNav ? (
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-square md:hidden"
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
      ) : null}

      <div className="flex-none">
        <Link to="/" className="btn btn-ghost btn-sm text-base font-semibold px-2">
          gitweb
        </Link>
        {contextLabel ? (
          <span className="text-sm opacity-70 hidden sm:inline truncate max-w-[12rem]">
            {contextLabel}
          </span>
        ) : null}
      </div>

      <div className="flex-1 flex justify-center px-2">
        <button
          type="button"
          className={cn(
            'btn btn-sm btn-ghost border border-base-300 bg-base-100',
            'w-full max-w-md justify-start gap-2 font-normal text-base-content/60',
          )}
          onClick={onOpenPalette}
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search or jump…</span>
          <kbd className="kbd kbd-sm ml-auto hidden sm:inline-flex">⌘K</kbd>
        </button>
      </div>

      <div className="flex-none flex items-center gap-1">
        {rl?.remaining != null && rl.remaining < 500 ? (
          <div
            className="badge badge-warning badge-sm hidden md:inline-flex"
            title="REST/GraphQL rate limit remaining (header)"
          >
            API {rl.remaining}
            {rl.limit != null ? `/${rl.limit}` : ''}
          </div>
        ) : null}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm btn-circle avatar placeholder"
          >
            {viewerAvatarUrl ? (
              <div className="w-8 rounded-full">
                <img src={viewerAvatarUrl} alt="" />
              </div>
            ) : (
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">
                  {viewerLogin?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow border border-base-300"
          >
            {viewerLogin ? (
              <li className="menu-title">
                <span>@{viewerLogin}</span>
              </li>
            ) : null}
            <li>
              <button
                type="button"
                onClick={() => {
                  const order: ThemePreference[] = ['system', 'light', 'dark'];
                  const i = order.indexOf(theme);
                  const next = order[(i + 1) % order.length]!;
                  setTheme(next);
                  setThemePreference(next);
                }}
              >
                Theme: {theme}
              </button>
            </li>
            {signedIn ? (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    clearToken();
                    onSignedOut();
                  }}
                >
                  Sign out
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  );
}
