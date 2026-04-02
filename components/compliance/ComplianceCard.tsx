import { Card } from '@/components/ui/card';

export function ComplianceCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <p className='text-sm text-slate-600'>{title}</p>
      <p className='text-xl font-bold text-ink'>{value}</p>
    </Card>
  );
}
