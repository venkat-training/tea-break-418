import { pickOne } from '@/lib/utils/random';
import { BLOCK_MESSAGES } from '@/lib/constants';
import type { MatchState, TeaState } from '@/lib/schemas/domain';
import { actionBlockedByRules, teaModeModifier } from './teaRules';

export function computeComplianceScore(teaState: TeaState): number {
  const base =
    teaState.kettleReadiness * 0.35 +
    teaState.biscuitCoverage * 0.25 +
    teaState.umpireHydration * 0.2 +
    teaState.captainConfidence * 0.2;
  return Math.max(0, Math.min(100, Math.round(base + teaModeModifier(teaState.teaMode))));
}

export function evaluateAction(action: string, teaState: TeaState, matchState: MatchState) {
  const reasons = actionBlockedByRules(action, teaState, matchState);
  const score = computeComplianceScore(teaState);

  if (reasons.length > 0 || score < 60) {
    return {
      allowed: false,
      status: 418,
      error: {
        code: 'TEA_BREAK_ENFORCED',
        title: "I'm a teapot",
        message: pickOne(BLOCK_MESSAGES),
        recoveryAction: 'Wait for kettle readiness or add biscuits.'
      },
      reasons,
      score
    };
  }

  return {
    allowed: true,
    status: 200,
    data: {
      action,
      recommendation: 'Action approved by Tea Compliance Engine.',
      score
    }
  };
}
