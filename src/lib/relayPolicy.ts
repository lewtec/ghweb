import type { FetchPolicy } from 'relay-runtime';

/**
 * Prefer cached Relay data immediately, refresh in the background.
 * Avoids full-screen suspend when the store already has a hit.
 */
export const STORE_AND_NETWORK = {
  fetchPolicy: 'store-and-network' as FetchPolicy,
};
