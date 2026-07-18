/**
 * Lightweight pending UI for route transitions — does not replace the whole page.
 * Used as Suspense fallback when React keeps the previous screen (startTransition).
 */
export function PagePending({ label = 'Loading…' }: { label?: string }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-12 z-30 h-0.5 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="h-full w-1/3 animate-[pagepending_1s_ease-in-out_infinite] bg-primary rounded-full" />
      <style>{`
        @keyframes pagepending {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 50%; }
          100% { transform: translateX(350%); width: 30%; }
        }
      `}</style>
    </div>
  );
}

/** Compact inline spinner for local regions only. */
export function InlinePending({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs opacity-60">
      <span className="loading loading-spinner loading-xs" />
      {label ?? null}
    </span>
  );
}
