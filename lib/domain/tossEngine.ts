import type { MatchState, TeaState } from '@/lib/schemas/domain';
import { evaluateAction } from './complianceEngine';

export const runTossAnalysis = (teaState: TeaState, matchState: MatchState) =>
  evaluateAction('Run Toss Analysis', teaState, matchState);
