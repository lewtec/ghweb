import { Link, useRouterState } from '@tanstack/react-router';
import {
  ChevronRight,
  CircleDot,
  Code2,
  GitPullRequest,
  Search,
  Workflow,
} from 'lucide-react';
import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  DEFAULT_GRAPHQL_BASE,
  addAccountAndActivate,
  getActiveMeKey,
  hardRefresh,
  listAccounts,
  removeAccount,
  signOutActive,
  switchAccount,
} from '@/lib/auth';
import { useToast } from '@/lib/toast';
import {
  getThemePreference,
  setThemePreference,
  type ThemePreference,
} from '@/lib/theme';
import { subscribeRateLimit, type RateLimitSnapshot } from '@/relay/environment';
import { cn } from '@/lib/cls';
import { parseRepoFromPath, rememberRepo } from '@/lib/recentRepos';

type Props = {
  onOpenPalette: () => void;
  viewerLogin?: string | null;
  viewerAvatarUrl?: string | null;
  signedIn: boolean;
  onSignedOut: () => void;
};

export function TopBar({
  onOpenPalette,
  viewerLogin,
  viewerAvatarUrl,
  signedIn,
  onSignedOut,
}: Props) {
  const toast = useToast();
  const [theme, setTheme] = useState<ThemePreference>(getThemePreference);
  const [rl, setRl] = useState<RateLimitSnapshot | null>(null);
  const [accounts, setAccounts] = useState(() => listAccounts());
  const [switchBusy, setSwitchBusy] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addPat, setAddPat] = useState('');
  const [addBase, setAddBase] = useState(DEFAULT_GRAPHQL_BASE);
  const [addError, setAddError] = useState<string | null>(null);
  const [addBusy, setAddBusy] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const repo = parseRepoFromPath(pathname);
  const accountPopoverId = `topbar-account-${useId().replace(/:/g, '')}`;
  const accountAnchor = `--${accountPopoverId}`;
  const addDialogId = `topbar-add-account-${useId().replace(/:/g, '')}`;
  const activeMeKey = getActiveMeKey();

  useEffect(() => subscribeRateLimit(setRl), []);

  useEffect(() => {
    if (repo) rememberRepo(repo.owner, repo.name);
  }, [repo?.owner, repo?.name]);

  useEffect(() => {
    if (addOpen) {
      const d = document.getElementById(addDialogId) as HTMLDialogElement | null;
      d?.showModal();
    }
  }, [addOpen, addDialogId]);

  const section = repoSection(pathname, repo);

  const refreshAccounts = () => setAccounts(listAccounts());

  const onSwitch = async (meKey: string) => {
    if (meKey === activeMeKey || switchBusy) return;
    setSwitchBusy(true);
    const result = await switchAccount(meKey);
    setSwitchBusy(false);
    refreshAccounts();
    if (!result.ok) {
      toast.error(
        result.unhealthy ? 'Account needs re-auth' : 'Could not switch',
        result.error,
      );
      return;
    }
    hardRefresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-200">
      <div className="navbar min-h-12 gap-1 px-2 w-full min-w-0">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-0.5 min-w-0 shrink"
        >
          <Link
            to="/"
            className="btn btn-ghost btn-sm font-semibold px-2 shrink-0"
          >
            ghweb
          </Link>

          {repo ? (
            <>
              <ChevronRight
                className="size-4 opacity-40 shrink-0"
                aria-hidden
              />
              <Link
                to="/$login"
                params={{ login: repo.owner }}
                className="btn btn-ghost btn-sm px-1.5 min-w-0 font-normal opacity-70 max-w-[5rem] sm:max-w-[8rem] truncate"
                title={repo.owner}
              >
                {repo.owner}
              </Link>
              <ChevronRight
                className="size-4 opacity-40 shrink-0"
                aria-hidden
              />
              <Link
                to="/$owner/$name"
                params={{ owner: repo.owner, name: repo.name }}
                className="btn btn-ghost btn-sm px-1.5 min-w-0 font-medium max-w-[5.5rem] sm:max-w-[10rem] truncate"
                title={repo.name}
              >
                {repo.name}
              </Link>
            </>
          ) : null}
        </nav>

        {repo ? (
          <div
            className="join shrink-0"
            role="navigation"
            aria-label="Repository sections"
          >
            <SectionLink
              to="/$owner/$name"
              params={{ owner: repo.owner, name: repo.name }}
              exact
              active={section === 'code'}
              label="Code"
              icon={Code2}
            />
            <SectionLink
              to="/$owner/$name/issues"
              params={{ owner: repo.owner, name: repo.name }}
              active={section === 'issues'}
              label="Issues"
              icon={CircleDot}
            />
            <SectionLink
              to="/$owner/$name/pulls"
              params={{ owner: repo.owner, name: repo.name }}
              active={section === 'prs'}
              label="PRs"
              icon={GitPullRequest}
            />
            <SectionLink
              to="/$owner/$name/actions"
              params={{ owner: repo.owner, name: repo.name }}
              active={section === 'actions'}
              label="Actions"
              icon={Workflow}
            />
          </div>
        ) : null}

        {/*
          flex-1 spacer must not steal taps from section icons that sit
          beside it on narrow screens (empty flex area covered the join).
        */}
        <div className="flex-1 flex justify-end md:justify-center px-1 min-w-0 pointer-events-none">
          {/* Narrow: icon-only; md+: full Jump… bar with ⌘K */}
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-square md:hidden pointer-events-auto"
            onClick={onOpenPalette}
            aria-label="Open command palette (⌘K)"
            title="Jump… (⌘K)"
          >
            <Search className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className={cn(
              'btn btn-sm btn-ghost border border-base-300 bg-base-100 pointer-events-auto',
              'hidden md:inline-flex w-full max-w-md justify-start gap-2 font-normal text-base-content/60',
            )}
            onClick={onOpenPalette}
            aria-label="Open command palette (⌘K)"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Jump… /code /issues /prs /actions</span>
            <kbd className="kbd kbd-sm ms-auto">⌘K</kbd>
          </button>
        </div>

        <div className="flex-none flex items-center gap-1 shrink-0">
          {rl?.remaining != null && rl.remaining < 500 ? (
            <div
              className="badge badge-warning badge-sm hidden md:inline-flex"
              title="Rate limit remaining"
            >
              API {rl.remaining}
              {rl.limit != null ? `/${rl.limit}` : ''}
            </div>
          ) : null}

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle avatar placeholder"
            aria-label="Account menu"
            popoverTarget={accountPopoverId}
            style={{ anchorName: accountAnchor } as CSSProperties}
          >
            {viewerAvatarUrl ? (
              <div className="w-8 rounded-full overflow-hidden bg-transparent">
                <img
                  src={viewerAvatarUrl}
                  alt=""
                  className="bg-transparent"
                />
              </div>
            ) : (
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">
                  {viewerLogin?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
            )}
          </button>
          <ul
            id={accountPopoverId}
            popover="auto"
            className={cn(
              'dropdown menu dropdown-end',
              'w-52 rounded-box bg-base-100 p-2 shadow border border-base-300',
            )}
            style={
              {
                positionAnchor: accountAnchor,
                positionArea: 'bottom span-left',
                positionTryFallbacks: 'flip-block, flip-inline',
              } as CSSProperties
            }
          >
            {viewerLogin ? (
              <li className="menu-title">
                <span>
                  @{viewerLogin}
                  {activeMeKey ? (
                    <span className="font-normal opacity-50"> · {activeMeKey}</span>
                  ) : null}
                </span>
              </li>
            ) : null}
            {accounts
              .filter((a) => a.meKey !== '_migrating')
              .map((a) => (
                <li key={a.meKey}>
                  <button
                    type="button"
                    className={cn(
                      'justify-between gap-2',
                      a.meKey === activeMeKey && 'active',
                    )}
                    disabled={switchBusy || a.meKey === activeMeKey}
                    onClick={() => void onSwitch(a.meKey)}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {a.avatarUrl ? (
                        <img
                          src={a.avatarUrl}
                          alt=""
                          className="size-5 rounded-full bg-transparent shrink-0"
                        />
                      ) : null}
                      <span className="truncate text-xs">{a.meKey}</span>
                    </span>
                    {a.unhealthy ? (
                      <span className="badge badge-xs badge-warning">re-auth</span>
                    ) : a.meKey === activeMeKey ? (
                      <span className="badge badge-xs">active</span>
                    ) : null}
                  </button>
                </li>
              ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setAddError(null);
                  setAddPat('');
                  setAddBase(DEFAULT_GRAPHQL_BASE);
                  setAddOpen(true);
                }}
              >
                Add account…
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  const order: ThemePreference[] = [
                    'system',
                    'light',
                    'dark',
                  ];
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
                  className="text-error"
                  onClick={() => {
                    const key = activeMeKey;
                    signOutActive();
                    if (key) {
                      // already removed by signOutActive
                    }
                    onSignedOut();
                    hardRefresh('/');
                  }}
                >
                  Sign out (remove account)
                </button>
              </li>
            ) : null}
            {accounts.length > 1 ? (
              <li>
                <button
                  type="button"
                  className="text-error"
                  onClick={() => {
                    if (!activeMeKey) return;
                    // Remove a non-active: not exposed per-row for density —
                    // remove others via re-add. Offer remove current sibling:
                    const others = accounts.filter(
                      (a) => a.meKey !== activeMeKey && a.meKey !== '_migrating',
                    );
                    for (const o of others) removeAccount(o.meKey);
                    refreshAccounts();
                    toast.info('Removed other saved accounts');
                  }}
                >
                  Remove other accounts
                </button>
              </li>
            ) : null}
          </ul>

          <dialog
            id={addDialogId}
            className="modal"
            onClose={() => setAddOpen(false)}
          >
            <div className="modal-box space-y-3">
              <h3 className="font-bold text-lg">Add account</h3>
              <p className="text-xs opacity-60">
                Tokens stay in this browser until you remove the account.
              </p>
              <label className="form-control w-full">
                <span className="label-text text-sm">API base URL</span>
                <input
                  type="url"
                  className="input input-bordered input-sm w-full font-mono text-xs"
                  value={addBase}
                  onChange={(e) => setAddBase(e.target.value)}
                  disabled={addBusy}
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text text-sm">PAT</span>
                <input
                  type="password"
                  className="input input-bordered input-sm w-full"
                  autoComplete="off"
                  value={addPat}
                  onChange={(e) => setAddPat(e.target.value)}
                  disabled={addBusy}
                />
              </label>
              {addError ? (
                <div className="alert alert-error text-sm py-2">{addError}</div>
              ) : null}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    (
                      document.getElementById(
                        addDialogId,
                      ) as HTMLDialogElement | null
                    )?.close();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={!addPat.trim() || addBusy}
                  onClick={() => {
                    void (async () => {
                      setAddBusy(true);
                      setAddError(null);
                      const result = await addAccountAndActivate(
                        addPat,
                        addBase,
                      );
                      setAddBusy(false);
                      if (!result.ok) {
                        setAddError(result.error);
                        return;
                      }
                      hardRefresh();
                    })();
                  }}
                >
                  {addBusy ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    'Add and switch'
                  )}
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button type="submit">close</button>
            </form>
          </dialog>
        </div>
      </div>
    </header>
  );
}

function SectionLink({
  to,
  params,
  active,
  label,
  icon: Icon,
  exact,
}: {
  to:
    | '/$owner/$name'
    | '/$owner/$name/issues'
    | '/$owner/$name/pulls'
    | '/$owner/$name/actions';
  params: { owner: string; name: string };
  active: boolean;
  label: string;
  icon: typeof Code2;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      params={params}
      activeOptions={exact ? { exact: true } : undefined}
      className={cn(
        'btn btn-sm join-item btn-ghost px-2',
        active && 'btn-active bg-base-100',
      )}
      title={label}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className="size-4" />
      <span className="hidden lg:inline text-xs">{label}</span>
    </Link>
  );
}

function repoSection(
  pathname: string,
  repo: { owner: string; name: string } | null,
): 'code' | 'issues' | 'prs' | 'actions' | null {
  if (!repo) return null;
  const base = `/${repo.owner}/${repo.name}`;
  if (pathname === base || pathname.startsWith(`${base}/tree/`) || pathname.startsWith(`${base}/blob/`)) {
    return 'code';
  }
  if (pathname.startsWith(`${base}/issues`)) return 'issues';
  if (
    pathname.startsWith(`${base}/pulls`) ||
    pathname.startsWith(`${base}/pull/`)
  ) {
    return 'prs';
  }
  if (pathname.startsWith(`${base}/actions`)) return 'actions';
  return 'code';
}
