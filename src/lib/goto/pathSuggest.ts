import {
  isPathExpression,
  relativeToLocation,
  resolveFromCodeLocation,
  stripSlashes,
} from '@/lib/repoPath';
import { listRepoDir } from '@/lib/rest';
import { parseSlashCommand } from './slash';
import type { GotoCandidate, GotoContext, PathNavAnchor } from './types';

const MAX_SUGGESTIONS = 40;

/**
 * Async path autocomplete with **relative** labels (from current location).
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

  const loc = { mode: anchor.mode, path: anchor.path };
  const { listDir, prefix } = completionContext(anchor, q);
  const out: GotoCandidate[] = [];
  const seen = new Set<string>();

  const add = (c: GotoCandidate) => {
    if (seen.has(c.id)) return;
    seen.add(c.id);
    out.push(c);
  };

  const exact = resolveFromCodeLocation(loc, q);
  const climb = isPureClimb(q);

  // Pure `..`: destination first (relative `..`), never "current path" as #1
  if (climb && exact != null) {
    const rel = relativeToLocation(loc, exact, true);
    add({
      id: `path:${exact || '/'}`,
      label: rel,
      hint: 'up',
      value: `path climb ${q} ${rel}`,
      group: 'Path',
      icon: 'path',
      priority: 0,
      action: {
        kind: 'open-repo-path',
        owner: anchor.owner,
        name: anchor.name,
        ref: anchor.refName,
        path: exact,
        knownKind: 'tree',
      },
    });
  }

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
    if (exact != null && !climb) {
      add(relCandidate(anchor, exact, false, q, 5));
    }
    return out;
  }

  const pref = prefix.toLowerCase();
  const currentAbs = stripSlashes(loc.path);
  const cwdAbs =
    loc.mode === 'blob'
      ? stripSlashes(anchor.cwd)
      : stripSlashes(anchor.path);

  const matches = entries.filter((e) => {
    if (pref && !e.name.toLowerCase().startsWith(pref)) return false;
    // Don't suggest the directory we're already in as a "go up" peer when climbing
    if (climb && e.type === 'dir' && e.path === cwdAbs) return false;
    if (climb && e.path === currentAbs) return false;
    return true;
  });

  for (const e of matches.slice(0, MAX_SUGGESTIONS)) {
    const isDir = e.type === 'dir';
    const rel = relativeToLocation(loc, e.path, isDir);
    add({
      id: `path:${e.path}`,
      label: rel,
      hint: isDir ? 'dir' : 'file',
      value: `path ${q} ${rel} ${e.path}`,
      group: 'Path',
      icon: 'path',
      priority: isDir ? 10 : 20,
      action: {
        kind: 'open-repo-path',
        owner: anchor.owner,
        name: anchor.name,
        ref: anchor.refName,
        path: e.path,
        knownKind: isDir ? 'tree' : 'blob',
      },
    });
  }

  // Non-climb exact (e.g. typed full relative that resolves)
  if (exact != null && !climb && !seen.has(`path:${exact || '/'}`)) {
    const isDir = entries.some((e) => e.path === exact && e.type === 'dir');
    // only if looks complete
    if (!prefix || matches.some((m) => m.path === exact) || q.endsWith('/')) {
      add(relCandidate(anchor, exact, isDir, q, 2));
    }
  }

  // Sort: lower priority first
  out.sort((a, b) => a.priority - b.priority);
  return out;
}

function relCandidate(
  anchor: PathNavAnchor,
  absPath: string,
  isDir: boolean,
  q: string,
  priority: number,
): GotoCandidate {
  const loc = { mode: anchor.mode, path: anchor.path };
  const rel = relativeToLocation(loc, absPath, isDir);
  return {
    id: `path:${absPath || '/'}`,
    label: rel,
    hint: q,
    value: `path exact ${q} ${rel}`,
    group: 'Path',
    icon: 'path',
    priority,
    action: {
      kind: 'open-repo-path',
      owner: anchor.owner,
      name: anchor.name,
      ref: anchor.refName,
      path: absPath,
      knownKind: isDir ? 'tree' : undefined,
    },
  };
}

export function completionContext(
  anchor: PathNavAnchor,
  query: string,
): { listDir: string; prefix: string } {
  const q = query.trim();
  const loc = { mode: anchor.mode, path: anchor.path };

  if (isPureClimb(q)) {
    // List the parent (destination of ..), not current
    const parent = resolveFromCodeLocation(loc, q) ?? '';
    return { listDir: parent, prefix: '' };
  }

  if (q.endsWith('/') || q === '.' || q === './') {
    const dir = resolveFromCodeLocation(loc, q) ?? '';
    return { listDir: dir, prefix: '' };
  }

  if (!q.includes('/')) {
    const listDir = resolveFromCodeLocation(loc, '.') ?? '';
    return { listDir, prefix: q };
  }

  const slash = q.lastIndexOf('/');
  const parentExpr = q.slice(0, slash);
  const prefix = q.slice(slash + 1);
  const listDir =
    resolveFromCodeLocation(
      loc,
      parentExpr === '' ? '/' : parentExpr,
    ) ?? '';
  return { listDir, prefix };
}

function isPureClimb(q: string): boolean {
  const t = q.trim().replace(/\/+$/, '');
  if (!t) return false;
  return t.split('/').every((p) => p === '..');
}
