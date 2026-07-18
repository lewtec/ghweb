import type { GotoCandidate } from './types';
import { ALIASES, type SlashCommand } from './slash';

/**
 * Next query string when the user presses Tab (full replace, never append).
 *
 * - Paths: selected/first Path item as absolute repo path (`/src/lib/`); dirs end with `/`
 * - Slash: `/pr` → `/prs `
 */
export function tabCompleteQuery(
  query: string,
  items: GotoCandidate[],
  selectedValue: string,
): string | null {
  const trimmed = query.trimEnd();

  // 1) Slash command expansion
  if (trimmed.startsWith('/')) {
    // Incomplete slash cmd only (no space yet) — e.g. /pr
    if (!/\s/.test(trimmed.slice(1))) {
      const slash = expandSlash(trimmed);
      if (slash != null && slash !== query) return slash;
    }
    // Absolute path already: fall through to path completion
  }

  // 2) Path expansion — always absolute-from-root so resolve never double-prefixes
  const pathItems = items.filter(
    (i) => i.group === 'Path' && i.action.kind === 'open-repo-path',
  );
  if (pathItems.length === 0) return null;

  const selected =
    pathItems.find((i) => i.value === selectedValue) ?? pathItems[0]!;

  if (selected.action.kind !== 'open-repo-path') return null;

  const path = selected.action.path;
  const isDir =
    selected.action.knownKind === 'tree' || selected.label.endsWith('/');

  const completed = toAbsoluteQuery(path, isDir);
  if (completed === trimmed || completed === query) return null;
  return completed;
}

/** Repo path → query form with leading `/` (and trailing `/` for dirs). */
export function toAbsoluteQuery(path: string, isDir: boolean): string {
  if (!path) return '/';
  const base = path.startsWith('/') ? path : `/${path}`;
  if (isDir) return base.endsWith('/') ? base : `${base}/`;
  return base.replace(/\/+$/, '');
}

/** Expand incomplete `/pr` → `/prs ` etc. */
export function expandSlash(query: string): string | null {
  if (!query.startsWith('/')) return null;
  const body = query.slice(1);
  if (/\s/.test(body)) return null;

  const partial = body.toLowerCase();
  if (!partial) return null;

  // Don't treat absolute paths as slash commands: /src, /foo/bar
  if (body.includes('/')) return null;

  const matched = new Set<SlashCommand['cmd']>();
  for (const [alias, cmd] of Object.entries(ALIASES)) {
    if (alias.startsWith(partial) || cmd.startsWith(partial)) {
      matched.add(cmd);
    }
  }
  // /src — "s" matches search; "sr" matches nothing for cmds; "sou" no
  // But "s" alone is ambiguous with paths — only expand if unique cmd match
  // AND partial is not longer looking like a path (no.)
  if (matched.size !== 1) return null;

  const cmd = [...matched][0]!;
  // Prefer not expanding single-letter if it could be path (except known aliases)
  // Keep: /s → search, /i → issues, /p → prs? p matches pr, pull, prs → unique prs
  const token =
    cmd === 'prs'
      ? 'prs'
      : cmd === 'issues'
        ? 'issues'
        : cmd === 'search'
          ? 'search'
          : 'code';
  return `/${token} `;
}
