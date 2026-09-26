import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Run `fetcher` whenever it changes. Later responses from an older call are ignored.
 * Clears data at the start of each run so a new key cannot flash the previous result.
 */
export function useLatestAsync<T>(fetcher: () => Promise<T>): {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchSeq = useRef(0);

  const reload = useCallback(() => {
    const seq = ++fetchSeq.current;
    setLoading(true);
    setError(null);
    setData(null);
    void fetcher()
      .then((result) => {
        if (seq === fetchSeq.current) setData(result);
      })
      .catch((e: unknown) => {
        if (seq === fetchSeq.current) {
          setError(e instanceof Error ? e.message : String(e));
        }
      })
      .finally(() => {
        if (seq === fetchSeq.current) setLoading(false);
      });
  }, [fetcher]);

  useEffect(() => {
    reload();
    return () => {
      fetchSeq.current += 1;
    };
  }, [reload]);

  return { data, error, loading, reload };
}
