import { TAGLINE } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
      <p className='text-xs uppercase tracking-wide text-pitch'>Tea Break 418</p>
      <h2 className='mt-2 text-3xl font-bold text-ink'>Cricket operations. Tea-first governance.</h2>
      <p className='mt-2 max-w-2xl text-slate-600'>{TAGLINE}</p>
      <div className='mt-4 flex flex-wrap gap-3'>
        <Button>Start Match</Button>
        <Button className='bg-tea'>Trigger Emergency Tea Audit</Button>
        <Button className='bg-pitch'>View Demo Dashboard</Button>
      </div>
    </section>
  );
}
