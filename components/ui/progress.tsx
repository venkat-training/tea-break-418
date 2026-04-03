import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  variant?: 'default' | 'compliance';
  showLabel?: boolean;
  className?: string;
}

function getComplianceColor(value: number) {
  if (value >= 80) return 'bg-pitch-light';
  if (value >= 60) return 'bg-willow';
  if (value >= 40) return 'bg-tea-amber';
  return 'bg-danger';
}

export function Progress({ value, variant = 'default', showLabel = false, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const barColor = variant === 'compliance' ? getComplianceColor(clamped) : 'bg-pitch';

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className='flex justify-between text-xs font-mono text-muted'>
          <span>0</span>
          <span className='font-medium text-ink'>{clamped}%</span>
          <span>100</span>
        </div>
      )}
      <div className='h-2 w-full overflow-hidden rounded-full bg-cream-deep'>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor)}
          style={{ width: `${clamped}%` }}
          role='progressbar'
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
