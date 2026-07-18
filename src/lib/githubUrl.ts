/** Parse github.com URLs into in-app paths when supported. */
export function githubUrlToAppPath(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    const bare = input.trim().replace(/^\/+/, '');
    if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\/.*)?$/.test(bare)) {
      return `/${bare}`;
    }
    return null;
  }
  if (!['github.com', 'www.github.com'].includes(url.hostname)) return null;
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  return `/${parts.join('/')}${url.search}`;
}
