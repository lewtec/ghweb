import { getToken } from '@/lib/auth';

const API = 'https://api.github.com';

export type RestPullFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  previous_filename?: string;
};

export async function fetchPullFiles(
  owner: string,
  repo: string,
  number: number,
): Promise<RestPullFile[]> {
  const token = getToken();
  if (!token) throw new Error('Not signed in');

  const out: RestPullFile[] = [];
  let page = 1;
  for (;;) {
    const res = await fetch(
      `${API}/repos/${owner}/${repo}/pulls/${number}/files?per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`REST pull files ${res.status}: ${body.slice(0, 400)}`);
    }
    const batch = (await res.json()) as RestPullFile[];
    out.push(...batch);
    if (batch.length < 100) break;
    page += 1;
    if (page > 20) break;
  }
  return out;
}

/**
 * Probe whether a path exists on a ref. Returns blob/tree or null if missing.
 * Empty path = repository root tree.
 */
export async function probeRepoPath(
  owner: string,
  repo: string,
  ref: string,
  path: string,
): Promise<'blob' | 'tree' | null> {
  const token = getToken();
  if (!token) throw new Error('Not signed in');

  if (!path) return 'tree';

  const encPath = path
    .split('/')
    .map((s) => encodeURIComponent(s))
    .join('/');
  const url = `${API}/repos/${owner}/${repo}/contents/${encPath}?ref=${encodeURIComponent(ref)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`REST contents ${res.status}: ${body.slice(0, 300)}`);
  }
  const data: unknown = await res.json();
  if (Array.isArray(data)) return 'tree';
  if (
    data &&
    typeof data === 'object' &&
    'type' in data &&
    (data as { type: string }).type === 'file'
  ) {
    return 'blob';
  }
  if (
    data &&
    typeof data === 'object' &&
    'type' in data &&
    (data as { type: string }).type === 'dir'
  ) {
    return 'tree';
  }
  return null;
}

/** Full GFM via GitHub REST (for README/blob .md — no bodyHTML on Blob). */
export async function renderMarkdownGfm(
  markdown: string,
  context?: string,
): Promise<string> {
  const token = getToken();
  if (!token) throw new Error('Not signed in');

  const res = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      text: markdown,
      mode: 'gfm',
      ...(context ? { context } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Markdown render ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.text();
}
