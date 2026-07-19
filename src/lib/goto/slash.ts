/** Normalized slash commands: /code, /issues, /prs, /actions, /search [rest] */

export type SlashCommand = {
  cmd: 'code' | 'issues' | 'prs' | 'actions' | 'search' | 'switch';
  rest: string;
};

export const ALIASES: Record<string, SlashCommand['cmd']> = {
  code: 'code',
  issues: 'issues',
  issue: 'issues',
  prs: 'prs',
  pulls: 'prs',
  pr: 'prs',
  pull: 'prs',
  actions: 'actions',
  action: 'actions',
  workflows: 'actions',
  ci: 'actions',
  search: 'search',
  s: 'search',
  switch: 'switch',
  account: 'switch',
  accounts: 'switch',
  whoami: 'switch',
};

export function parseSlashCommand(q: string): SlashCommand | null {
  if (!q.startsWith('/')) return null;
  const body = q.slice(1).trim();
  const [cmdRaw, ...restParts] = body.split(/\s+/);
  const raw = (cmdRaw ?? '').toLowerCase();
  if (!raw) return null;
  const cmd = ALIASES[raw];
  if (!cmd) return null;
  return { cmd, rest: restParts.join(' ').trim() };
}

export function slashMatches(
  slash: SlashCommand,
  section: 'code' | 'issues' | 'prs' | 'actions',
): boolean {
  return slash.cmd === section;
}
