import { describe, expect, it } from 'vitest';
import {
  computeComplianceScore,
  evaluateAction,
  getComplianceGrade
} from '@/lib/domain/complianceEngine';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('complianceEngine — computeComplianceScore', () => {
  it('computes score within 0–100 range', () => {
    const score = computeComplianceScore(SEEDED_TEA);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('produces higher score with better tea state', () => {
    const poor = { ...SEEDED_TEA, kettleReadiness: 0, biscuitCoverage: 0 };
    const good = {
      ...SEEDED_TEA,
      kettleReadiness: 100,
      biscuitCoverage: 100,
      umpireHydration: 100,
      captainConfidence: 100
    };
    expect(computeComplianceScore(good)).toBeGreaterThan(computeComplianceScore(poor));
  });

  it('applies tea mode modifier correctly', () => {
    const base = { ...SEEDED_TEA, teaMode: 'English Breakfast' as const };
    const chai = { ...SEEDED_TEA, teaMode: 'Masala Chai' as const };
    const herbal = { ...SEEDED_TEA, teaMode: 'Herbal Infusion' as const };
    expect(computeComplianceScore(chai)).toBeGreaterThan(computeComplianceScore(base));
    expect(computeComplianceScore(herbal)).toBeLessThan(computeComplianceScore(base));
  });

  it('clamps score to 0 at minimum', () => {
    const worst = {
      teaMode: 'Herbal Infusion' as const,
      kettleReadiness: 0,
      biscuitCoverage: 0,
      umpireHydration: 0,
      captainConfidence: 0
    };
    expect(computeComplianceScore(worst)).toBe(0);
  });

  it('clamps score to 100 at maximum', () => {
    const best = {
      teaMode: 'Masala Chai' as const,
      kettleReadiness: 100,
      biscuitCoverage: 100,
      umpireHydration: 100,
      captainConfidence: 100
    };
    expect(computeComplianceScore(best)).toBe(100);
  });
});

describe('complianceEngine — getComplianceGrade', () => {
  it('returns CRITICAL below 40', () => {
    expect(getComplianceGrade(0)).toBe('CRITICAL');
    expect(getComplianceGrade(39)).toBe('CRITICAL');
  });

  it('returns WARNING between 40 and 59', () => {
    expect(getComplianceGrade(40)).toBe('WARNING');
    expect(getComplianceGrade(59)).toBe('WARNING');
  });

  it('returns NOMINAL between 60 and 79', () => {
    expect(getComplianceGrade(60)).toBe('NOMINAL');
    expect(getComplianceGrade(79)).toBe('NOMINAL');
  });

  it('returns OPTIMAL at 80 and above', () => {
    expect(getComplianceGrade(80)).toBe('OPTIMAL');
    expect(getComplianceGrade(100)).toBe('OPTIMAL');
  });
});

describe('complianceEngine — evaluateAction', () => {
  it('blocks override action with 418 status', () => {
    const result = evaluateAction('Override Tea Protocol', SEEDED_TEA, SEEDED_MATCH);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(418);
  });

  it('includes error details on block', () => {
    const result = evaluateAction('Override Tea Protocol', SEEDED_TEA, SEEDED_MATCH);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.error.code).toBe('TEA_BREAK_ENFORCED');
      expect(result.error.message).toBeTruthy();
      expect(result.error.recoveryAction).toBeTruthy();
    }
  });

  it('includes score and grade in blocked result', () => {
    const result = evaluateAction('Override Tea Protocol', SEEDED_TEA, SEEDED_MATCH);
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('grade');
  });

  it('allows action when tea state is fully compliant', () => {
    const passing = {
      teaMode: 'Masala Chai' as const,
      kettleReadiness: 90,
      biscuitCoverage: 90,
      umpireHydration: 90,
      captainConfidence: 90
    };
    const earlyMatch = { ...SEEDED_MATCH, overs: 5 };
    const result = evaluateAction('Initiate Bowling Change', passing, earlyMatch);
    expect(result.allowed).toBe(true);
    expect(result.status).toBe(200);
  });

  it('blocks when score is below threshold even with no rule violations', () => {
    const lowScore = {
      teaMode: 'Herbal Infusion' as const,
      kettleReadiness: 40,
      biscuitCoverage: 40,
      umpireHydration: 40,
      captainConfidence: 40
    };
    const earlyMatch = { ...SEEDED_MATCH, overs: 5 };
    const result = evaluateAction('Initiate Bowling Change', lowScore, earlyMatch);
    expect(result.allowed).toBe(false);
  });
});
