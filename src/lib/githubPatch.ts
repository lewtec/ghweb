/**
 * Normalize GitHub REST pull-file `patch` strings for @git-diff-view.
 *
 * GitHub returns a partial unified diff (often starting at `@@`, no git headers,
 * CRLF, missing trailing newline). The DiffView parser throws
 * "Expected unified diff line but reached end of diff" on malformed input.
 */

export function normalizeGithubPatch(patch: string): string[] {
  if (!patch || !patch.trim()) return [];

  // Unify newlines
  let text = patch.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (!text.endsWith('\n')) text += '\n';

  // Drop any leading non-hunk noise (some clients prepend headers)
  const firstHunk = text.indexOf('@@');
  if (firstHunk === -1) return [];
  text = text.slice(firstHunk);

  // Split into individual @@ hunks (DiffView accepts an array of hunk strings)
  const rawParts = text.split(/(?=^@@)/m).filter((p) => p.length > 0);
  const hunks: string[] = [];

  for (const part of rawParts) {
    if (!part.startsWith('@@')) continue;
    const fixed = fixHunkBody(part);
    if (fixed) hunks.push(fixed);
  }

  return hunks;
}

/**
 * Ensure every content line has a valid unified-diff prefix and the hunk ends
 * cleanly with a newline.
 */
function fixHunkBody(hunk: string): string | null {
  let text = hunk.endsWith('\n') ? hunk : `${hunk}\n`;
  const lines = text.split('\n');
  // last split element is '' after trailing \n
  if (lines.length && lines[lines.length - 1] === '') lines.pop();
  if (!lines.length || !lines[0]!.startsWith('@@')) return null;

  const out: string[] = [lines[0]!];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!;
    // Valid unified prefixes: ' ', '+', '-', '\', or empty (treat empty as context ' ')
    if (
      line.startsWith(' ') ||
      line.startsWith('+') ||
      line.startsWith('-') ||
      line.startsWith('\\')
    ) {
      out.push(line);
    } else if (line === '') {
      // empty line in patch = context empty line
      out.push(' ');
    } else if (line.startsWith('@@')) {
      // shouldn't happen mid-hunk after split; start new (ignore / merge)
      break;
    } else {
      // Unexpected — treat as context so the parser doesn't die
      out.push(` ${line}`);
    }
  }

  // Parser wants a complete hunk; ensure at least header
  if (out.length < 1) return null;
  return `${out.join('\n')}\n`;
}

/** Safe filename for display in headers (no path tricks needed for hunks-only). */
export function patchFileNames(
  filename: string,
  previousFilename?: string | null,
  status?: string,
): { oldName: string; newName: string } {
  if (status === 'added') {
    return { oldName: '/dev/null', newName: filename };
  }
  if (status === 'removed') {
    return { oldName: filename, newName: '/dev/null' };
  }
  if (status === 'renamed' && previousFilename) {
    return { oldName: previousFilename, newName: filename };
  }
  return {
    oldName: previousFilename || filename,
    newName: filename,
  };
}
