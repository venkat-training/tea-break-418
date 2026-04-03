import { describe, expect, it } from 'vitest';
import { runTossAnalysis } from '@/lib/domain/tossEngine';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('tossEngine', () => {
  it('blocks toss when kettle readiness is below threshold', () => {
    const result = runTossAnalysis(SEEDED_TEA, SEEDED_MATCH);
    expect(result.allowed).toBe(false);
  });

  it('returns 418 status when blocked', () => {
    const result = runTossAnalysis(SEEDED_TEA, SEEDED_MATCH);
    expect(result.status).toBe(418);
  });

  it('includes score in blocked result', () => {
    const result = runTossAnalysis(SEEDED_TEA, SEEDED_MATCH);
    expect(result).toHaveProperty('score');
    expect(typeof result.score).toBe('number');
  });

  it('allows toss when kettle is ready and compliance is sufficient', () => {
    const readyTea = {
      ...SEEDED_TEA,
      teaMode: 'Masala Chai' as const,
      kettleReadiness: 90,
      biscuitCoverage: 90,
      umpireHydration: 90,
      captainConfidence: 90
    };
    const earlyMatch = { ...SEEDED_MATCH, overs: 5 };
    const result = runTossAnalysis(readyTea, earlyMatch);
    expect(result.allowed).toBe(true);
  });

  it('includes structured error on block', () => {
    const result = runTossAnalysis(SEEDED_TEA, SEEDED_MATCH);
    if (!result.allowed) {
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe('TEA_BREAK_ENFORCED');
    }
  });
});
