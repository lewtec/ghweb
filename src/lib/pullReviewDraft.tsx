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
export function PullReviewDraftProvider({
  prKey,
  children,
}: {
  /** owner/name#number — reset draft when PR changes */
  prKey: string;
  children: ReactNode;
}) {
  const [reviewBody, setReviewBodyState] = useState('');
  // Remount state when prKey changes via key on provider from parent, or:
  const [keyed, setKeyed] = useState(prKey);
  if (keyed !== prKey) {
    setKeyed(prKey);
    setReviewBodyState('');
  }

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
