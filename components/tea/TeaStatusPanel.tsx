import { Card } from '@/components/ui/card';
import type { TeaState } from '@/lib/schemas/domain';

export function TeaStatusPanel({ teaState, score }: { teaState: TeaState; score: number }) {
  return (
    <Card>
      <h3 className='mb-2 font-semibold'>Tea Compliance Metrics</h3>
      <ul className='space-y-1 text-sm'>
        <li>Tea Compliance Score: {score}</li>
        <li>Kettle Readiness Index: {teaState.kettleReadiness}</li>
        <li>Biscuit Coverage Ratio: {teaState.biscuitCoverage}</li>
        <li>Umpire Hydration Index: {teaState.umpireHydration}</li>
        <li>Captain Confidence Index: {teaState.captainConfidence}</li>
      </ul>
    </Card>
  );
}
