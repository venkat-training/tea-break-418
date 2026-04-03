'use client';

import type { TeaState } from '@/lib/schemas/domain';

const modes: Array<{ value: TeaState['teaMode']; emoji: string; modifier: string }> = [
  { value: 'English Breakfast', emoji: '🫖', modifier: '+0' },
  { value: 'Masala Chai', emoji: '☕', modifier: '+5 ✨' },
  { value: 'Earl Grey', emoji: '🌸', modifier: '+2' },
  { value: 'Green Tea', emoji: '🍵', modifier: '-4' },
  { value: 'Herbal Infusion', emoji: '🌿', modifier: '-8 ⚠️' }
];

export function TeaModeSelector({
  value,
  onChange
}: {
  value: string;
  onChange: (mode: TeaState['teaMode']) => void;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='font-mono text-[10px] uppercase tracking-widest text-muted'>
        Tea Mode
      </label>
      <div className='flex flex-wrap gap-2'>
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-150 ${
              value === mode.value
                ? 'border-tea bg-tea text-cream shadow-tea-glow'
                : 'border-cream-deep bg-white text-ink hover:border-tea/40 hover:bg-cream-deep/50'
            }`}
            aria-pressed={value === mode.value}
          >
            <span>{mode.emoji}</span>
            <span>{mode.value}</span>
            <span
              className={`font-mono text-xs ${
                value === mode.value ? 'text-cream/70' : 'text-muted'
              }`}
            >
              ({mode.modifier})
            </span>
          </button>
        ))}
      </div>
      <p className='font-mono text-[11px] text-muted/60'>
        Tea mode applies a compliance score modifier. Masala Chai is the highest rated.
      </p>
    </div>
  );
}
