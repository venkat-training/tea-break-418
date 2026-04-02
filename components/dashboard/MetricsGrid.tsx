import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getComplianceGrade } from '@/lib/domain/complianceEngine';

interface Metric {
  label: string;
  value: number;
  icon?: string;
  description?: string;
}

const gradeBadge = {
  OPTIMAL: { label: 'OPTIMAL', className: 'badge-optimal' },
  NOMINAL: { label: 'NOMINAL', className: 'badge-nominal' },
  WARNING: { label: 'WARNING', className: 'badge-warning' },
  CRITICAL: { label: 'CRITICAL', className: 'badge-critical' }
};

export function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <section className='grid gap-4 md:grid-cols-3'>
      {metrics.map((metric, i) => {
        const grade = getComplianceGrade(metric.value);
        const badge = gradeBadge[grade];
        return (
          <Card
            key={metric.label}
            className={`animate-fade-up delay-${(i + 1) * 100} opacity-0 transition-shadow hover:shadow-card-hover`}
          >
            <div className='mb-3 flex items-start justify-between'>
              <div>
                <p className='text-xs font-medium uppercase tracking-wider text-muted'>
                  {metric.icon && <span className='mr-1.5'>{metric.icon}</span>}
                  {metric.label}
                </p>
                <p className='mt-1 font-display text-3xl font-bold text-ink'>
                  {metric.value}
                  <span className='ml-1 text-base font-normal text-muted'>/ 100</span>
                </p>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
            {metric.description && (
              <p className='mb-3 text-xs text-muted'>{metric.description}</p>
            )}
            <Progress value={metric.value} variant='compliance' />
          </Card>
        );
      })}
    </section>
  );
}