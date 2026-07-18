import type { GotoCandidate } from './types';
import { ALIASES, type SlashCommand } from './slash';

/**
 * Compute the next query string when the user presses Tab.
 * Returns null if nothing to expand.
 *
 * - Paths: expand to the selected (or first) Path suggestion; dirs get a trailing `/`
 * - Slash: `/pr` → `/prs `, `/i` → `/issues `, …
 */
export function tabCompleteQuery(
  query: string,
  items: GotoCandidate[],
  selectedValue: string,
): string | null {
  const q = query; // preserve trailing space intent via trimEnd carefully
  const trimmed = q.trimEnd();

  // 1) Slash command expansion (before path — `/pr` is not a path)
  if (trimmed.startsWith('/')) {
    const slash = expandSlash(trimmed);
    if (slash != null && slash !== q) return slash;
  }

  // 2) Path expansion from Path group
  const pathItems = items.filter((i) => i.group === 'Path');
  if (pathItems.length === 0) return null;

  const selected =
    pathItems.find((i) => i.value === selectedValue) ?? pathItems[0]!;

  if (selected.action.kind !== 'open-repo-path') return null;

  const path = selected.action.path;
  const isDir =
    selected.action.knownKind === 'tree' || selected.label.endsWith('/');

  // Absolute-from-repo-root typing: `src/lib/`
  const completed = isDir ? (path ? `${path}/` : '/') : path;
  if (completed === trimmed || completed === q) return null;
  return completed;
}

/** Expand incomplete `/pr` → `/prs ` etc. Exported for tests. */
export function expandSlash(query: string): string | null {
  if (!query.startsWith('/')) return null;
  const body = query.slice(1);
  // Already `cmd rest` — nothing to complete on the command token
  if (/\s/.test(body)) return null;

  const partial = body.toLowerCase();
  if (!partial) return null;

  // Collect cmds whose alias or canonical name starts with partial
  const matched = new Set<SlashCommand['cmd']>();
  for (const [alias, cmd] of Object.entries(ALIASES)) {
    if (alias.startsWith(partial) || cmd.startsWith(partial)) {
      matched.add(cmd);
    }
  }
  if (matched.size !== 1) return null;

  const cmd = [...matched][0]!;
  // Canonical token for display
  const token =
    cmd === 'prs' ? 'prs' : cmd === 'issues' ? 'issues' : cmd === 'search' ? 'search' : 'code';
  return `/${token} `;
}

/**
 * Longest common path prefix among Path suggestions (for multi-match Tab).
 * Prefer tabCompleteQuery's selected-item expansion; this is a fallback helper.
 */
export function commonPathPrefix(items: GotoCandidate[]): string | null {
  const paths = items
    .filter((i) => i.group === 'Path' && i.action.kind === 'open-repo-path')
    .map((i) =>
      i.action.kind === 'open-repo-path' ? i.action.path : '',
    );
  if (paths.length < 2) return null;
  let prefix = paths[0]!;
  for (let i = 1; i < paths.length; i++) {
    const p = paths[i]!;
    let j = 0;
    while (j < prefix.length && j < p.length && prefix[j] === p[j]) j++;
    prefix = prefix.slice(0, j);
  }
  // snap to last full segment
  const slash = prefix.lastIndexOf('/');
  if (slash === -1) return prefix.length > 0 ? prefix : null;
  return prefix.slice(0, slash + 1) || null;
}
