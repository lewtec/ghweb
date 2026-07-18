type Props = {
  title: string;
  detail?: string;
  onRetry?: () => void;
};

export function ErrorBanner({ title, detail, onRetry }: Props) {
  return (
    <div className="alert alert-error my-2">
      <div className="min-w-0 flex-1">
        <div className="font-medium">{title}</div>
        {detail ? (
          <pre className="text-xs whitespace-pre-wrap break-words mt-1 opacity-90">
            {detail}
          </pre>
        ) : null}
      </div>
      {onRetry ? (
        <button type="button" className="btn btn-sm" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}
