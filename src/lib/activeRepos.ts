export type RepoRef = {
  id: string;
  nameWithOwner: string;
  name: string;
  ownerLogin: string;
  description?: string | null;
  isPrivate?: boolean | null;
  pushedAt?: string | null;
  updatedAt?: string | null;
  openIssues?: number | null;
  openPrs?: number | null;
};

export type WorkSignal = {
  nameWithOwner: string;
  kind: 'assigned' | 'review' | 'authored_pr';
  at: string;
};

export type RankedRepo = RepoRef & {
  score: number;
  signals: Array<WorkSignal['kind']>;
  lastActivityAt: string | null;
};

function ts(iso: string | null | undefined): number {
  if (!iso) return 0;
  const n = Date.parse(iso);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Rank repos for the home "Active" list.
 * Score: work signals + contribution/push presence + recency.
 */
export function rankActiveRepos(input: {
  signals: WorkSignal[];
  contributed: RepoRef[];
  pushed: RepoRef[];
  limit?: number;
}): RankedRepo[] {
  const limit = input.limit ?? 12;
  const byKey = new Map<string, RankedRepo>();

  const ensure = (repo: RepoRef): RankedRepo => {
    let row = byKey.get(repo.nameWithOwner);
    if (!row) {
      row = {
        ...repo,
        score: 0,
        signals: [],
        lastActivityAt: repo.pushedAt ?? repo.updatedAt ?? null,
      };
      byKey.set(repo.nameWithOwner, row);
    } else {
      // fill missing metadata from later sources
      if (!row.description && repo.description) row.description = repo.description;
      if (row.openIssues == null && repo.openIssues != null)
        row.openIssues = repo.openIssues;
      if (row.openPrs == null && repo.openPrs != null) row.openPrs = repo.openPrs;
      if (!row.pushedAt && repo.pushedAt) row.pushedAt = repo.pushedAt;
      if (!row.updatedAt && repo.updatedAt) row.updatedAt = repo.updatedAt;
    }
    return row;
  };

  for (const r of input.contributed) {
    const row = ensure(r);
    row.score += 2;
  }
  for (const r of input.pushed) {
    const row = ensure(r);
    row.score += 1;
  }

  for (const s of input.signals) {
    // triage-only repos may not be in contributed/pushed — still surface them
    let row = byKey.get(s.nameWithOwner);
    if (!row) {
      const [ownerLogin, name] = s.nameWithOwner.split('/');
      if (!ownerLogin || !name) continue;
      row = ensure({
        id: `signal:${s.nameWithOwner}`,
        nameWithOwner: s.nameWithOwner,
        name,
        ownerLogin,
      });
    }
    if (!row.signals.includes(s.kind)) row.signals.push(s.kind);
    if (s.kind === 'assigned') row.score += 3;
    else if (s.kind === 'review') row.score += 3;
    else if (s.kind === 'authored_pr') row.score += 2;
    if (ts(s.at) > ts(row.lastActivityAt)) row.lastActivityAt = s.at;
  }

  // Recency boost (0–3): last 14 days full, decays over ~90 days
  const now = Date.now();
  const day = 86_400_000;
  for (const row of byKey.values()) {
    const age = now - ts(row.lastActivityAt ?? row.pushedAt ?? row.updatedAt);
    if (age <= 14 * day) row.score += 3;
    else if (age <= 45 * day) row.score += 2;
    else if (age <= 90 * day) row.score += 1;
  }

  return [...byKey.values()]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        ts(b.lastActivityAt ?? b.pushedAt ?? b.updatedAt) -
        ts(a.lastActivityAt ?? a.pushedAt ?? a.updatedAt)
      );
    })
    .slice(0, limit);
}

export function activeKeys(repos: RankedRepo[]): Set<string> {
  return new Set(repos.map((r) => r.nameWithOwner));
}
