import * as React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'warning' | 'info' | 'success' | 'error';
}

const kindStyles = {
  warning: 'border-tea-amber/30 bg-tea-amber/8 text-tea',
  info: 'border-sky/30 bg-sky/8 text-sky-700',
  success: 'border-pitch-light/30 bg-pitch-light/8 text-pitch',
  error: 'border-danger/30 bg-danger/8 text-danger'
};

const kindIcons = {
  warning: '⚠️',
  info: 'ℹ️',
  success: '✅',
  error: '🚨'
};

export function Alert({ className, kind = 'info', children, ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-xl border p-3 text-sm',
        kindStyles[kind],
        className
      )}
      role='alert'
      {...props}
    >
      <span className='mt-px shrink-0 text-base leading-none'>{kindIcons[kind]}</span>
      <span>{children}</span>
    </div>
  );
}
