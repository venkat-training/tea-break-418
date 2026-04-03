import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getComplianceGrade } from '@/lib/domain/complianceEngine';
import type { TeaState } from '@/lib/schemas/domain';

const metrics = [
  {
    key: 'kettleReadiness' as keyof TeaState,
    label: 'Kettle Readiness',
    icon: '🫖',
    threshold: 65,
    tip: 'Must reach 65% before tactical decisions'
  },
  {
    key: 'biscuitCoverage' as keyof TeaState,
    label: 'Biscuit Coverage',
    icon: '🍪',
    threshold: 50,
    tip: 'Minimum 50% for batting operations'
  },
  {
    key: 'umpireHydration' as keyof TeaState,
    label: 'Umpire Hydration',
    icon: '💧',
    threshold: 55,
    tip: 'Must be 55%+ for powerplay decisions'
  },
  {
    key: 'captainConfidence' as keyof TeaState,
    label: 'Captain Confidence',
    icon: '🏏',
    threshold: 60,
    tip: 'Required for bowling changes'
  }
];

export function TeaStatusPanel({
  teaState,
  score
}: {
  teaState: TeaState;
  score: number;
}) {
  const grade = getComplianceGrade(score);
  const gradeConfig = {
    OPTIMAL: { label: 'Optimal', className: 'badge-optimal', emoji: '✅' },
    NOMINAL: { label: 'Nominal', className: 'badge-nominal', emoji: '📊' },
    WARNING: { label: 'Warning', className: 'badge-warning', emoji: '⚠️' },
    CRITICAL: { label: 'Critical', className: 'badge-critical', emoji: '🚨' }
  };
  const gradeInfo = gradeConfig[grade];

  return (
    <Card>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-widest text-muted'>
            Tea Compliance
          </p>
          <p className='font-display text-2xl font-bold text-ink'>
            {score}
            <span className='ml-1 text-sm font-normal text-muted'>/ 100</span>
          </p>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold ${gradeInfo.className}`}
        >
          {gradeInfo.emoji} {gradeInfo.label}
        </span>
      </div>

      <div className='space-y-3'>
        {metrics.map(({ key, label, icon, threshold, tip }) => {
          const value = teaState[key] as number;
          const passing = value >= threshold;
          return (
            <div key={key} title={tip}>
              <div className='mb-1 flex items-center justify-between text-xs'>
                <span className='flex items-center gap-1.5 font-medium text-ink/80'>
                  <span>{icon}</span>
                  {label}
                </span>
                <div className='flex items-center gap-1.5'>
                  <span className='font-mono font-semibold text-ink'>{value}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${passing ? 'bg-pitch-light' : 'bg-danger'}`}
                    title={passing ? 'Passing' : `Below threshold (${threshold})`}
                  />
                </div>
              </div>
              <Progress value={value} variant='compliance' />
            </div>
          );
        })}
      </div>

      <div className='mt-3 rounded-lg bg-cream-deep/60 px-3 py-2'>
        <p className='font-mono text-[11px] text-muted'>
          Tea Mode:{' '}
          <span className='font-semibold text-tea'>{teaState.teaMode}</span>
        </p>
      </div>
    </Card>
  );
}
