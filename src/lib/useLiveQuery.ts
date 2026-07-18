import { useEffect, useRef } from 'react';
import {
  fetchQuery,
  useRelayEnvironment,
  type GraphQLTaggedNode,
} from 'react-relay';
import type { Variables } from 'relay-runtime';

const DETAIL_POLL_MS = 45_000;
/** While Actions/checks are in progress — closer to github.com feel */
const ACTIVE_POLL_MS = 4_000;

export type LiveQueryOptions = {
  enabled?: boolean;
  /**
   * When true, poll every ~4s (GitHub-like). When false/undefined, ~45s.
   * Typically: any check suite/run still queued or in progress.
   */
  active?: boolean;
};

/**
 * Focus refetch + poll. Does not fetch on mount (caller already has data).
 * Use `active` for Actions/run pages while work is in flight.
 */
export function useLiveQuery(
  query: GraphQLTaggedNode,
  variables: Variables,
  enabledOrOptions: boolean | LiveQueryOptions = true,
): void {
  const opts: LiveQueryOptions =
    typeof enabledOrOptions === 'boolean'
      ? { enabled: enabledOrOptions }
      : enabledOrOptions;
  const enabled = opts.enabled !== false;
  const active = opts.active === true;

  const env = useRelayEnvironment();
  const varsRef = useRef(variables);
  varsRef.current = variables;

  useEffect(() => {
    if (!enabled) return;

    const run = () => {
      void fetchQuery(env, query, varsRef.current, {
        fetchPolicy: 'network-only',
      }).toPromise();
    };

    const onFocus = () => {
      if (document.visibilityState === 'visible') run();
    };

    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    const interval = active ? ACTIVE_POLL_MS : DETAIL_POLL_MS;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') run();
    }, interval);

    return () => {
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
      window.clearInterval(id);
    };
  }, [env, query, enabled, active]);
}
