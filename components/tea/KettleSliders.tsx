'use client';

import type { TeaState } from '@/lib/schemas/domain';

const sliders: Array<{
  key: keyof Omit<TeaState, 'teaMode'>;
  label: string;
  icon: string;
  threshold: number;
}> = [
  { key: 'kettleReadiness', label: 'Kettle Readiness', icon: '🫖', threshold: 65 },
  { key: 'biscuitCoverage', label: 'Biscuit Coverage', icon: '🍪', threshold: 50 },
  { key: 'umpireHydration', label: 'Umpire Hydration', icon: '💧', threshold: 55 },
  { key: 'captainConfidence', label: 'Captain Confidence', icon: '🏏', threshold: 60 }
];

interface KettleSlidersProps {
  teaState: TeaState;
  onChange: (key: keyof Omit<TeaState, 'teaMode'>, value: number) => void;
}

export function KettleSliders({ teaState, onChange }: KettleSlidersProps) {
  return (
    <div className='space-y-3'>
      <p className='font-mono text-[10px] uppercase tracking-widest text-muted'>
        Adjust Parameters
      </p>
      {sliders.map(({ key, label, icon, threshold }) => {
        const value = teaState[key];
        const passing = value >= threshold;
        return (
          <div key={key} className='space-y-1'>
            <div className='flex items-center justify-between text-xs'>
              <label htmlFor={`slider-${key}`} className='flex items-center gap-1.5 font-medium text-ink/80'>
                <span>{icon}</span>
                {label}
                <span className='font-mono text-muted'>≥{threshold}</span>
              </label>
              <div className='flex items-center gap-1.5'>
                <span className='font-mono font-semibold text-ink'>{value}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    passing ? 'bg-pitch-light' : 'bg-danger'
                  }`}
                />
              </div>
            </div>
            <input
              id={`slider-${key}`}
              type='range'
              min={0}
              max={100}
              value={value}
              onChange={(e) => onChange(key, Number(e.target.value))}
              className='h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-deep accent-pitch'
              aria-label={label}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        );
      })}
    </div>
  );
}
