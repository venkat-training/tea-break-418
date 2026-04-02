'use client';

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
    <section className='relative overflow-hidden rounded-3xl pitch-card text-cream shadow-pitch-glow'>
      {/* Cricket pitch lines */}
      <div className='pointer-events-none absolute inset-0'>
        {/* Crease lines */}
        <div className='absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-cream/10' />
        <div className='absolute bottom-12 left-1/2 h-px w-32 -translate-x-1/2 bg-cream/8' />
        {/* Pitch boundary arc */}
        <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full border border-cream/5' />
        <div className='absolute -right-8 -top-8 h-40 w-40 rounded-full border border-cream/8' />
        {/* Dots like field placings */}
        <div className='absolute left-8 top-8 h-1.5 w-1.5 rounded-full bg-cream/20' />
        <div className='absolute right-24 top-12 h-1 w-1 rounded-full bg-cream/15' />
        <div className='absolute bottom-16 right-8 h-1.5 w-1.5 rounded-full bg-cream/20' />
      </div>

      <div className='relative px-8 py-10 md:px-12 md:py-14'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            {/* Status pill */}
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-willow/30 bg-willow/10 px-3 py-1.5'>
              <span className='h-1.5 w-1.5 rounded-full bg-willow animate-pulse' />
              <span className='font-mono text-xs text-willow'>Enterprise Tea Governance Console</span>
            </div>

            {/* Main heading */}
            <h2 className='font-display text-4xl font-black leading-tight text-cream md:text-5xl'>
              Cricket ops.
              <br />
              <span className='italic text-tea-amber'>Tea-first</span> governance.
            </h2>

            <p className='mt-4 max-w-lg text-base leading-relaxed text-cream/70'>
              {TAGLINE}
            </p>

            {/* HTTP 418 badge */}
            <div className='mt-5 inline-flex items-center gap-2'>
              <span className='font-mono text-xs text-cream/40'>Powered by</span>
              <code className='rounded border border-tea-amber/30 bg-tea-amber/10 px-2 py-0.5 font-mono text-xs text-tea-amber'>
                HTTP 418 I&apos;m a Teapot
              </code>
            </div>
          </div>

          {/* Teapot illustration */}
          <div className='relative hidden md:flex items-end justify-center pb-2'>
            <div className='relative select-none'>
              {/* Steam wisps */}
              <div className='absolute -top-8 left-6 flex gap-2'>
                <div className='steam-1 h-6 w-0.5 rounded-full bg-cream/30' />
                <div className='steam-2 h-8 w-0.5 rounded-full bg-cream/20' />
                <div className='steam-3 h-5 w-0.5 rounded-full bg-cream/30' />
              </div>
              <div className='text-7xl drop-shadow-lg'>🫖</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='mt-8 flex flex-wrap gap-3'>
          <Button
            disabled={isBusy}
            onClick={onStartMatch}
            variant='cream'
            className='group'
          >
            <span className='mr-1.5'>🏏</span>
            Start Match
          </Button>
          <Button
            variant='tea'
            disabled={isBusy}
            onClick={onTriggerAudit}
          >
            <span className='mr-1.5'>🫖</span>
            Emergency Tea Audit
          </Button>
          <Button
            variant='ghost-cream'
            disabled={isBusy}
            onClick={onViewDemo}
          >
            View Demo
            <span className='ml-1.5 opacity-60'>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}