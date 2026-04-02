import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function MetricsGrid({ metrics }: { metrics: Array<{ label: string; value: number }> }) {
  return (
    <section className='grid gap-4 md:grid-cols-3'>
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <p className='text-sm text-slate-600'>{metric.label}</p>
          <p className='mb-2 text-2xl font-semibold text-ink'>{metric.value}</p>
          <Progress value={metric.value} />
        </Card>
      ))}
    </section>
  );
}
