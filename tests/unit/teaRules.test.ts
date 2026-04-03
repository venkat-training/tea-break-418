import { describe, expect, it } from 'vitest';
import {
  isKettleReady,
  isUmpireHydrated,
  hasBiscuitCoverage,
  isCaptainConfident,
  isTeaWindowActive,
  teaModeModifier,
  actionBlockedByRules,
  COMPLIANCE_THRESHOLD
} from '@/lib/domain/teaRules';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('teaRules — thresholds', () => {
  it('enforces kettle readiness threshold at 65', () => {
    expect(isKettleReady(64)).toBe(false);
    expect(isKettleReady(65)).toBe(true);
    expect(isKettleReady(100)).toBe(true);
  });

  it('enforces biscuit coverage threshold at 50', () => {
    expect(hasBiscuitCoverage(49)).toBe(false);
    expect(hasBiscuitCoverage(50)).toBe(true);
  });

  it('enforces umpire hydration threshold at 55', () => {
    expect(isUmpireHydrated(54)).toBe(false);
    expect(isUmpireHydrated(55)).toBe(true);
  });

  it('enforces captain confidence threshold at 60', () => {
    expect(isCaptainConfident(59)).toBe(false);
    expect(isCaptainConfident(60)).toBe(true);
  });

  it('marks tea window active at or above over 15', () => {
    expect(isTeaWindowActive(14.9)).toBe(false);
    expect(isTeaWindowActive(15)).toBe(true);
    expect(isTeaWindowActive(20)).toBe(true);
  });

  it('exports the correct compliance threshold', () => {
    expect(COMPLIANCE_THRESHOLD).toBe(60);
  });
});

describe('teaRules — tea mode modifiers', () => {
  it('returns correct modifier for each mode', () => {
    expect(teaModeModifier('English Breakfast')).toBe(0);
    expect(teaModeModifier('Masala Chai')).toBe(5);
    expect(teaModeModifier('Earl Grey')).toBe(2);
    expect(teaModeModifier('Green Tea')).toBe(-4);
    expect(teaModeModifier('Herbal Infusion')).toBe(-8);
  });

  it('applies positive modifier for Masala Chai', () => {
    expect(teaModeModifier('Masala Chai')).toBeGreaterThan(0);
  });

  it('applies negative modifier for Herbal Infusion', () => {
    expect(teaModeModifier('Herbal Infusion')).toBeLessThan(0);
  });
});

describe('teaRules — actionBlockedByRules', () => {
  const passing = {
    ...SEEDED_TEA,
    kettleReadiness: 80,
    biscuitCoverage: 80,
    umpireHydration: 80,
    captainConfidence: 80
  };
  const earlyMatch = { ...SEEDED_MATCH, overs: 5 };

  it('always blocks Override Tea Protocol', () => {
    const reasons = actionBlockedByRules('Override Tea Protocol', passing, earlyMatch);
    expect(reasons).toHaveLength(1);
    expect(reasons[0]).toContain('non-bypassable');
  });

  it('blocks Run Toss Analysis when kettle is not ready', () => {
    const reasons = actionBlockedByRules(
      'Run Toss Analysis',
      { ...passing, kettleReadiness: 40 },
      earlyMatch
    );
    expect(reasons.some((r) => r.includes('Kettle readiness'))).toBe(true);
  });

  it('does not block Run Toss Analysis when kettle is ready', () => {
    const reasons = actionBlockedByRules('Run Toss Analysis', passing, earlyMatch);
    expect(reasons).toHaveLength(0);
  });

  it('blocks batting aggression when biscuit coverage is low', () => {
    const reasons = actionBlockedByRules(
      'Recommend Batting Aggression',
      { ...passing, biscuitCoverage: 20 },
      earlyMatch
    );
    expect(reasons.some((r) => r.includes('Biscuit coverage'))).toBe(true);
  });

  it('blocks powerplay when umpire is dehydrated', () => {
    const reasons = actionBlockedByRules(
      'Approve Powerplay Acceleration',
      { ...passing, umpireHydration: 30 },
      earlyMatch
    );
    expect(reasons.some((r) => r.includes('Umpire hydration'))).toBe(true);
  });

  it('blocks bowling change when captain confidence is low', () => {
    const reasons = actionBlockedByRules(
      'Initiate Bowling Change',
      { ...passing, captainConfidence: 30 },
      earlyMatch
    );
    expect(reasons.some((r) => r.includes('Captain confidence'))).toBe(true);
  });

  it('blocks all non-toss actions during tea window', () => {
    const lateMatch = { ...SEEDED_MATCH, overs: 16 };
    const battingReasons = actionBlockedByRules(
      'Recommend Batting Aggression',
      passing,
      lateMatch
    );
    expect(battingReasons.some((r) => r.includes('Tea window lock'))).toBe(true);

    const tossReasons = actionBlockedByRules('Run Toss Analysis', passing, lateMatch);
    expect(tossReasons.some((r) => r.includes('Tea window lock'))).toBe(false);
  });
});
