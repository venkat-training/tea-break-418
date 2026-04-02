import { describe, expect, it } from 'vitest';
import { runTossAnalysis } from '@/lib/domain/tossEngine';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('tossEngine', () => {
  it('blocks toss when kettle readiness is poor', () => {
    const result = runTossAnalysis(SEEDED_TEA, SEEDED_MATCH);
    expect(result.allowed).toBe(false);
  });
});
