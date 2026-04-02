import { TAGLINE } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartMatch?: () => void;
  onTriggerAudit?: () => void;
  onViewDemo?: () => void;
  isBusy?: boolean;
}

export function Hero({ onStartMatch, onTriggerAudit, onViewDemo, isBusy = false }: HeroProps) {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
      <p className='text-xs uppercase tracking-wide text-pitch'>Tea Break 418</p>
      <h2 className='mt-2 text-3xl font-bold text-ink'>Cricket operations. Tea-first governance.</h2>
      <p className='mt-2 max-w-2xl text-slate-600'>{TAGLINE}</p>
      <div className='mt-4 flex flex-wrap gap-3'>
        <Button disabled={isBusy} onClick={onStartMatch}>Start Match</Button>
        <Button className='bg-tea' disabled={isBusy} onClick={onTriggerAudit}>Trigger Emergency Tea Audit</Button>
        <Button className='bg-pitch' disabled={isBusy} onClick={onViewDemo}>View Demo Dashboard</Button>
      </div>
    </section>
  );
}
