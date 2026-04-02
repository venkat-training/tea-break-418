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

export const actionBlockedByRules = (action: string, teaState: TeaState, matchState: MatchState): string[] => {
  const reasons: string[] = [];
  if (action === 'Override Tea Protocol') reasons.push('Tea governance is non-bypassable.');
  if (action === 'Run Toss Analysis' && !isKettleReady(teaState.kettleReadiness)) reasons.push('Kettle readiness below threshold.');
  if (action === 'Recommend Batting Aggression' && !hasBiscuitCoverage(teaState.biscuitCoverage)) reasons.push('Biscuit coverage below threshold.');
  if (action === 'Approve Powerplay Acceleration' && !isUmpireHydrated(teaState.umpireHydration)) reasons.push('Umpire hydration below threshold.');
  if (isTeaWindowActive(matchState.overs) && action !== 'Run Toss Analysis') reasons.push('Tea window lock active in middle-late overs.');
  return reasons;
};
