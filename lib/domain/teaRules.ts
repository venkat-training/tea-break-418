import type { MatchState, TeaState } from '@/lib/schemas/domain';

const modifiers: Record<TeaState['teaMode'], number> = {
  'English Breakfast': 0,
  'Masala Chai': 5,
  'Earl Grey': 2,
  'Green Tea': -4,
  'Herbal Infusion': -8
};

export const teaModeModifier = (mode: TeaState['teaMode']): number => modifiers[mode];

export const isTeaWindowActive = (overs: number): boolean => overs >= 15;
export const isKettleReady = (kettleReadiness: number): boolean => kettleReadiness >= 65;
export const hasBiscuitCoverage = (biscuitCoverage: number): boolean => biscuitCoverage >= 50;
export const isUmpireHydrated = (umpireHydration: number): boolean => umpireHydration >= 55;
export const isCaptainConfident = (captainConfidence: number): boolean =>
  captainConfidence >= 60;

export const COMPLIANCE_THRESHOLD = 60;

export const actionBlockedByRules = (
  action: string,
  teaState: TeaState,
  matchState: MatchState
): string[] => {
  const reasons: string[] = [];

  if (action === 'Override Tea Protocol') {
    reasons.push('Tea governance is non-bypassable. RFC 2324 compliance is mandatory.');
  }

  if (action === 'Run Toss Analysis' && !isKettleReady(teaState.kettleReadiness)) {
    reasons.push(
      `Kettle readiness ${teaState.kettleReadiness}% is below the 65% operational threshold.`
    );
  }

  if (action === 'Recommend Batting Aggression' && !hasBiscuitCoverage(teaState.biscuitCoverage)) {
    reasons.push(
      `Biscuit coverage ${teaState.biscuitCoverage}% is insufficient. Minimum 50% required.`
    );
  }

  if (
    action === 'Approve Powerplay Acceleration' &&
    !isUmpireHydrated(teaState.umpireHydration)
  ) {
    reasons.push(
      `Umpire hydration index ${teaState.umpireHydration}% is below the 55% safety threshold.`
    );
  }

  if (action === 'Initiate Bowling Change' && !isCaptainConfident(teaState.captainConfidence)) {
    reasons.push(
      `Captain confidence index ${teaState.captainConfidence}% insufficient for tactical changes.`
    );
  }

  if (isTeaWindowActive(matchState.overs) && action !== 'Run Toss Analysis') {
    reasons.push(
      `Tea window lock active at over ${matchState.overs}. All tactical actions deferred pending brew completion.`
    );
  }

  return reasons;
};