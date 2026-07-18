export function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 p-4 text-sm opacity-70">
      <span className="loading loading-spinner loading-sm" />
      {label}
    </div>
  );
}
