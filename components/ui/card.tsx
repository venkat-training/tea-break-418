import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pitch' | 'tea' | 'elevated';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  if (variant === 'pitch') {
    return (
      <div
        className={cn('pitch-card rounded-2xl p-4 text-cream', className)}
        {...props}
      />
    );
  }
  if (variant === 'tea') {
    return (
      <div
        className={cn('tea-gradient rounded-2xl p-4 text-cream shadow-tea-glow', className)}
        {...props}
      />
    );
  }
  if (variant === 'elevated') {
    return (
      <div
        className={cn(
          'rounded-2xl bg-white p-4 shadow-card-hover border border-cream-deep/50',
          className
        )}
        {...props}
      />
    );
  }
  return (
    <div
      className={cn('paper-card rounded-2xl p-4', className)}
      {...props}
    />
  );
}