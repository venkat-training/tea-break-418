import { pickOne } from '@/lib/utils/random';
import { BLOCK_MESSAGES } from '@/lib/constants';
import type { MatchState, TeaState } from '@/lib/schemas/domain';
import {
  actionBlockedByRules,
  teaModeModifier,
  COMPLIANCE_THRESHOLD
} from './teaRules';

export function computeComplianceScore(teaState: TeaState): number {
  const base =
    teaState.kettleReadiness * 0.35 +
    teaState.biscuitCoverage * 0.25 +
    teaState.umpireHydration * 0.2 +
    teaState.captainConfidence * 0.2;
  return Math.max(0, Math.min(100, Math.round(base + teaModeModifier(teaState.teaMode))));
}

export function getComplianceGrade(score: number): 'CRITICAL' | 'WARNING' | 'NOMINAL' | 'OPTIMAL' {
  if (score < 40) return 'CRITICAL';
  if (score < COMPLIANCE_THRESHOLD) return 'WARNING';
  if (score < 80) return 'NOMINAL';
  return 'OPTIMAL';
}

export function evaluateAction(action: string, teaState: TeaState, matchState: MatchState) {
  const reasons = actionBlockedByRules(action, teaState, matchState);
  const score = computeComplianceScore(teaState);
  const grade = getComplianceGrade(score);

  if (reasons.length > 0 || score < COMPLIANCE_THRESHOLD) {
    return {
      allowed: false,
      status: 418,
      error: {
        code: 'TEA_BREAK_ENFORCED',
        title: "I'm a teapot",
        message: pickOne(BLOCK_MESSAGES),
        recoveryAction:
          'Increase kettle readiness above 65%, ensure biscuit coverage ≥ 50%, and wait for tea window to close.',
        details: reasons.length > 0 ? reasons : [`Compliance score ${score} below threshold ${COMPLIANCE_THRESHOLD}.`]
      },
      reasons,
      score,
      grade
    };
  }

  return {
    allowed: true,
    status: 200,
    data: {
      action,
      recommendation: 'Action approved by Tea Compliance Engine.',
      score,
      grade
    }
  };
}