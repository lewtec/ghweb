import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type PullReviewDraftValue = {
  /** Shared optional review body / summary (More menu + conversation form). */
  reviewBody: string;
  setReviewBody: (next: string) => void;
  clearReviewBody: () => void;
};

const PullReviewDraftContext = createContext<PullReviewDraftValue | null>(null);

/**
 * PR-scoped draft review text. Lives above conversation/files routes so the
 * More menu summary and conversation "Optional review body" stay in sync.
 */
export function PullReviewDraftProvider({ children }: { children: ReactNode }) {
  // Reset when PR changes by putting key={prKey} on this provider from the route.
  const [reviewBody, setReviewBodyState] = useState('');

  const setReviewBody = useCallback((next: string) => {
    setReviewBodyState(next);
  }, []);

  const clearReviewBody = useCallback(() => {
    setReviewBodyState('');
  }, []);

  const value = useMemo(
    () => ({ reviewBody, setReviewBody, clearReviewBody }),
    [reviewBody, setReviewBody, clearReviewBody],
  );

  return (
    <PullReviewDraftContext.Provider value={value}>
      {children}
    </PullReviewDraftContext.Provider>
  );
}

export function usePullReviewDraft(): PullReviewDraftValue {
  const ctx = useContext(PullReviewDraftContext);
  if (!ctx) {
    throw new Error(
      'usePullReviewDraft must be used within PullReviewDraftProvider',
    );
  }
  return ctx;
}
