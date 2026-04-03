'use client';

import { useEffect, useState } from 'react';
import { TEA_FACTS } from '@/lib/constants';

export function Footer() {
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFactIdx((i) => (i + 1) % TEA_FACTS.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className='mt-12 border-t border-cream-deep bg-cream/60 py-8'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>🫖</span>
            <p className='text-sm text-muted'>
              Match progression suspended pending supervised brewing.
            </p>
          </div>
          <div className='max-w-lg rounded-xl border border-cream-deep bg-white/60 px-4 py-2.5'>
            <p className='font-mono text-[10px] uppercase tracking-widest text-muted mb-1'>
              Did you know?
            </p>
            <p
              key={factIdx}
              className='animate-fade-in text-xs text-ink/70'
            >
              {TEA_FACTS[factIdx]}
            </p>
          </div>
        </div>
        <div className='mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted/50'>
          <span className='font-mono'>RFC 2324</span>
          <span>·</span>
          <span className='font-mono'>HTCPCP/1.0</span>
          <span>·</span>
          <span className='font-mono'>HTTP 418</span>
          <span>·</span>
          <span>Built for the DEV April Fools Challenge 2026</span>
        </div>
      </div>
    </footer>
  );
}
