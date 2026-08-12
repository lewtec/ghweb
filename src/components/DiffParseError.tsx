/** Fallback UI when @git-diff-view cannot parse a patch. */
export function DiffParseError({
  hunks,
  parseError,
}: {
  hunks: string[];
  parseError: string | null;
}) {
  return (
    <div className="p-3 space-y-2">
      <div className="alert alert-warning text-sm">
        Diff viewer could not parse this patch
        {parseError ? ` (${parseError})` : ''}. Raw patch below.
      </div>
      <pre className="text-xs overflow-auto max-h-[min(40vh,24rem)] bg-base-200 p-2 rounded-box whitespace-pre-wrap">
        {hunks.join('')}
      </pre>
    </div>
  );
}
