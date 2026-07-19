import { useState } from 'react';
import {
  DEFAULT_GRAPHQL_BASE,
  addAccountAndActivate,
  hardRefresh,
  listAccounts,
  switchAccount,
  type StoredAccount,
} from '@/lib/auth';

type Props = {
  onSignedIn: () => void;
  /** When true, title/copy for adding another account (still full-page). */
  adding?: boolean;
};

export function LoginScreen({ onSignedIn, adding }: Props) {
  const [pat, setPat] = useState('');
  const [baseUrl, setBaseUrl] = useState(DEFAULT_GRAPHQL_BASE);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const saved = listAccounts().filter((a) => a.meKey !== '_migrating');

  const submit = async () => {
    if (!pat.trim()) {
      setError('Token is required');
      return;
    }
    setBusy(true);
    setError(null);
    const result = await addAccountAndActivate(pat, baseUrl);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSignedIn();
    hardRefresh();
  };

  const activateSaved = async (acc: StoredAccount) => {
    setBusy(true);
    setError(null);
    const result = await switchAccount(acc.meKey);
    setBusy(false);
    if (!result.ok) {
      setError(
        result.unhealthy
          ? `${acc.meKey} needs a new PAT (${result.error})`
          : result.error,
      );
      return;
    }
    onSignedIn();
    hardRefresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card bg-base-100 w-full max-w-md shadow border border-base-300">
        <div className="card-body gap-3">
          <h1 className="card-title text-xl">
            {adding ? 'Add account' : 'ghweb'}
          </h1>
          <p className="text-sm opacity-80">
            Paste a GitHub personal access token (same idea as{' '}
            <code className="text-xs">gh auth token</code>). Accounts are stored
            in this browser until you remove them; the active account is per
            tab.
          </p>

          {saved.length > 0 && !adding ? (
            <div className="space-y-1">
              <div className="text-xs font-medium opacity-60">Saved accounts</div>
              <ul className="menu bg-base-200 rounded-box w-full p-1">
                {saved.map((a) => (
                  <li key={a.meKey}>
                    <button
                      type="button"
                      className="justify-start gap-2"
                      disabled={busy}
                      onClick={() => void activateSaved(a)}
                    >
                      {a.avatarUrl ? (
                        <img
                          src={a.avatarUrl}
                          alt=""
                          className="size-6 rounded-full bg-transparent"
                        />
                      ) : null}
                      <span className="truncate">{a.meKey}</span>
                      {a.unhealthy ? (
                        <span className="badge badge-xs badge-warning">
                          re-auth
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="divider text-xs my-1">or add</div>
            </div>
          ) : null}

          <label className="form-control w-full">
            <span className="label-text text-sm">API base URL</span>
            <input
              type="url"
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300 font-mono text-xs"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={DEFAULT_GRAPHQL_BASE}
              disabled={busy}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text text-sm">PAT</span>
            <input
              type="password"
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              autoComplete="off"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              placeholder="ghp_… or github_pat_…"
              disabled={busy}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void submit();
              }}
            />
          </label>
          {error ? (
            <div className="alert alert-error text-sm py-2">{error}</div>
          ) : null}
          <button
            type="button"
            className="btn btn-primary"
            disabled={!pat.trim() || busy}
            onClick={() => void submit()}
          >
            {busy ? (
              <span className="loading loading-spinner loading-sm" />
            ) : adding ? (
              'Add and switch'
            ) : (
              'Continue'
            )}
          </button>
          <p className="text-xs opacity-60">
            Recommended scopes: <code>repo</code>, <code>read:org</code>,{' '}
            <code>read:user</code>, <code>workflow</code>. Tokens stay in this
            browser until you remove the account.
          </p>
        </div>
      </div>
    </div>
  );
}
