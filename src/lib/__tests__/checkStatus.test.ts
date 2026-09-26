import { describe, expect, it } from 'vitest';
import { checkLabel } from '@/lib/checkStatus';

describe('checkLabel', () => {
  it('humanizes in-progress status and terminal conclusion the same way', () => {
    expect(checkLabel('IN_PROGRESS', null)).toBe('in progress');
    expect(checkLabel('COMPLETED', 'TIMED_OUT')).toBe('timed out');
    expect(checkLabel('COMPLETED', null)).toBe('unknown');
  });
});
