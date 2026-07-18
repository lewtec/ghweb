import { relativeToLocation } from '@/lib/repoPath';
import type { GotoCandidate, PathNavAnchor } from './types';
import { ALIASES, type SlashCommand } from './slash';

/**
 * Tab: full-replace query with a **relative** completion (dirs end with `/`).
 */
export function tabCompleteQuery(
  query: string,
  items: GotoCandidate[],
  selectedValue: string,
  anchor: PathNavAnchor | null,
): string | null {
  const trimmed = query.trimEnd();

  // Slash commands: /pr → /prs  (only incomplete cmd token, not /src/…)
  if (
    trimmed.startsWith('/') &&
    !/\s/.test(trimmed.slice(1)) &&
    !trimmed.slice(1).includes('/')
  ) {
    const slash = expandSlash(trimmed);
    if (slash != null && slash !== query) return slash;
  }

  const pathItems = items.filter(
    (i) => i.group === 'Path' && i.action.kind === 'open-repo-path',
  );
  if (pathItems.length === 0 || !anchor) return null;

  const selected =
    pathItems.find((i) => i.value === selectedValue) ?? pathItems[0]!;

  if (selected.action.kind !== 'open-repo-path') return null;

  const abs = selected.action.path;
  const isDir =
    selected.action.knownKind === 'tree' || selected.label.endsWith('/');

  const completed = relativeToLocation(
    { mode: anchor.mode, path: anchor.path },
    abs,
    isDir,
  );

  if (completed === trimmed || completed === query) return null;
  return completed;
}

export function expandSlash(query: string): string | null {
  if (!query.startsWith('/')) return null;
  const body = query.slice(1);
  if (/\s/.test(body) || body.includes('/')) return null;

  const partial = body.toLowerCase();
  if (!partial) return null;

  const matched = new Set<SlashCommand['cmd']>();
  for (const [alias, cmd] of Object.entries(ALIASES)) {
    if (alias.startsWith(partial) || cmd.startsWith(partial)) {
      matched.add(cmd);
    }
  }
  if (matched.size !== 1) return null;

  const cmd = [...matched][0]!;
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
