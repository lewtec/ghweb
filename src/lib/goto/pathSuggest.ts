import {
  formatRepoPath,
  isPathExpression,
  resolveFromCodeLocation,
} from '@/lib/repoPath';
import { listRepoDir } from '@/lib/rest';
import { parseSlashCommand } from './slash';
import type { GotoCandidate, GotoContext, PathNavAnchor } from './types';

const MAX_SUGGESTIONS = 40;

/**
 * Async path autocomplete from real GitHub directory listings.
 * Type a path → matching files/dirs appear → select redirects.
 */
export async function suggestPaths(
  ctx: GotoContext,
  query: string,
): Promise<GotoCandidate[]> {
  const anchor = ctx.pathNav;
  if (!anchor) return [];
  const q = query.trim();
  if (!q) return [];
  if (parseSlashCommand(q)) return [];
  if (!isPathExpression(q, { inCode: true })) return [];

  const { listDir, prefix } = completionContext(anchor, q);
  const out: GotoCandidate[] = [];
  const seen = new Set<string>();

  const add = (c: GotoCandidate) => {
    if (seen.has(c.id)) return;
    seen.add(c.id);
    out.push(c);
  };

  let entries;
  try {
    entries = await listRepoDir(
      anchor.owner,
      anchor.name,
      anchor.refName,
      listDir,
    );
  } catch {
    return out;
  }
  if (!entries) {
    // Parent dir missing — still offer exact resolve (probe on select)
    const exact = resolveFromCodeLocation(
      { mode: anchor.mode, path: anchor.path },
      q,
    );
    if (exact != null) {
      add(exactCandidate(anchor, q, exact, 1));
    }
    return out;
  }

  const pref = prefix.toLowerCase();
  const matches = entries.filter((e) =>
    pref ? e.name.toLowerCase().startsWith(pref) : true,
  );

  for (const e of matches.slice(0, MAX_SUGGESTIONS)) {
    const kind = e.type === 'dir' ? ('tree' as const) : ('blob' as const);
    add({
      id: `path:${e.path}`,
      label: e.type === 'dir' ? `${e.path}/` : e.path,
      hint: e.type === 'dir' ? 'dir' : 'file',
      value: `path ${q} ${e.path} ${e.name}`,
      group: 'Path',
      icon: 'path',
      priority: e.type === 'dir' ? 10 : 20,
      action: {
        kind: 'open-repo-path',
        owner: anchor.owner,
        name: anchor.name,
        ref: anchor.refName,
        path: e.path,
        knownKind: kind,
      },
    });
  }

  // If typed path fully matches one entry, it's already included.
  // If typed path resolves elsewhere (e.g. ../x), add exact candidate.
  const exact = resolveFromCodeLocation(
    { mode: anchor.mode, path: anchor.path },
    q,
  );
  if (
    exact != null &&
    !seen.has(`path:${exact}`) &&
    (q.endsWith('/') || !prefix || exact.endsWith(prefix) || exact === '')
  ) {
    // only add exact when it's a climb / trailing slash / complete-looking
    if (
      q.endsWith('/') ||
      isPureClimb(q) ||
      matches.some((m) => m.path === exact)
    ) {
      add(exactCandidate(anchor, q, exact, 0));
    }
  }

  // Always surface pure climb / absolute exact even if empty listing filter
  if (exact != null && (isPureClimb(q) || q === '/' || q === '.')) {
    add(exactCandidate(anchor, q, exact, 0));
  }

  return out;
}

function exactCandidate(
  anchor: PathNavAnchor,
  q: string,
  exact: string,
  priority: number,
): GotoCandidate {
  return {
    id: `path:${exact || '/'}`,
    label: formatRepoPath(exact),
    hint: q,
    value: `path exact ${q} ${exact || '/'}`,
    group: 'Path',
    icon: 'path',
    priority,
    action: {
      kind: 'open-repo-path',
      owner: anchor.owner,
      name: anchor.name,
      ref: anchor.refName,
      path: exact,
    },
  };
}

/** Directory to list + incomplete name prefix. */
export function completionContext(
  anchor: PathNavAnchor,
  query: string,
): { listDir: string; prefix: string } {
  const q = query.trim();

  if (q.endsWith('/') || isPureClimb(q) || q === '.' || q === './') {
    const dir =
      resolveFromCodeLocation({ mode: anchor.mode, path: anchor.path }, q) ??
      '';
    return { listDir: dir, prefix: '' };
  }

  // no slash: complete names in current directory
  if (!q.includes('/')) {
    const listDir =
      resolveFromCodeLocation(
        { mode: anchor.mode, path: anchor.path },
        '.',
      ) ?? '';
    return { listDir, prefix: q };
  }

  // path/with/prefix — list parent, filter last segment
  const slash = q.lastIndexOf('/');
  const parentExpr = q.slice(0, slash);
  const prefix = q.slice(slash + 1);
  const listDir =
    resolveFromCodeLocation(
      { mode: anchor.mode, path: anchor.path },
      parentExpr === '' ? '/' : parentExpr,
    ) ?? '';
  return { listDir, prefix };
}

function isPureClimb(q: string): boolean {
  const t = q.trim().replace(/\/+$/, '');
  if (!t) return false;
  return t.split('/').every((p) => p === '..');
}
