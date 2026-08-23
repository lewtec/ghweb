import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  TRIAGE,
  TRIAGE_HOME_PREVIEW,
  TRIAGE_PAGE_SIZE,
  TRIAGE_SEARCH_CAP,
} from '../triage';

describe('TRIAGE', () => {
  it('keeps home GraphQL search strings in sync with the list pages', () => {
    const home = readFileSync(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../screens/HomePage.tsx',
      ),
      'utf8',
    );
    for (const spec of Object.values(TRIAGE)) {
      expect(home).toContain(`query: "${spec.searchQuery}"`);
    }
    expect(home).toContain(`first: ${TRIAGE_HOME_PREVIEW}`);
  });

  it('uses a page size under GitHub search first:100 and a known 1000 cap', () => {
    expect(TRIAGE_PAGE_SIZE).toBeGreaterThan(TRIAGE_HOME_PREVIEW);
    expect(TRIAGE_PAGE_SIZE).toBeLessThanOrEqual(100);
    expect(TRIAGE_SEARCH_CAP).toBe(1000);
  });
});
