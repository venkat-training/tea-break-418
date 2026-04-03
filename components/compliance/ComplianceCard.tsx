import { Card } from '@/components/ui/card';

export function ComplianceCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <p className='font-mono text-[10px] uppercase tracking-widest text-muted'>{title}</p>
      <p className='mt-1 font-display text-xl font-bold text-ink'>{value}</p>
    </Card>
  );
}
