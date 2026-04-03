'use client';

import { useEffect, useState } from 'react';
import { TEA_FACTS } from '@/lib/constants';

export function TeaFactTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TEA_FACTS.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='flex items-start gap-3 rounded-2xl border border-sky/20 bg-sky/5 p-4'>
      <span className='mt-0.5 shrink-0 text-base'>📡</span>
      <div>
        <p className='font-mono text-[10px] uppercase tracking-widest text-sky-700'>
          418 Intelligence Feed
        </p>
        <p
          className={`mt-1 text-sm text-ink/70 transition-opacity duration-400 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {TEA_FACTS[idx]}
        </p>
      </div>
    </div>
  );
}
