'use client';

import { APP_NAME } from '@/lib/constants';
import { useState, useEffect } from 'react';

export function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-deep'
          : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-3'>
          {/* Teapot icon */}
          <div className='relative flex h-9 w-9 items-center justify-center rounded-full bg-pitch text-cream text-lg shadow-pitch-glow'>
            🫖
          </div>
          <div>
            <h1 className='font-display text-lg font-bold leading-none text-ink'>{APP_NAME}</h1>
            <p className='text-[10px] font-mono uppercase tracking-widest text-muted'>
              RFC 2324 Compliant
            </p>
          </div>
        </div>

        <div className='hidden items-center gap-6 md:flex'>
          <nav className='flex items-center gap-4 text-sm font-medium text-muted'>
            <span className='cursor-default text-xs font-mono tracking-wider text-muted/60'>
              v1.0.0-teapot
            </span>
          </nav>
          <div className='flex items-center gap-1.5 rounded-full border border-tea/20 bg-tea/5 px-3 py-1.5'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-tea-amber'></span>
            <span className='font-mono text-[11px] font-medium text-tea'>KETTLE ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}