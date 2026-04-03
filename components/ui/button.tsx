import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cream' | 'tea' | 'ghost-cream' | 'pitch' | 'danger';
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-ink text-cream hover:bg-ink/90 shadow-sm',
  cream:
    'bg-cream text-ink hover:bg-cream/90 shadow-sm font-semibold',
  tea:
    'bg-tea text-cream hover:bg-tea-warm shadow-tea-glow',
  'ghost-cream':
    'border border-cream/30 text-cream/80 hover:bg-cream/10 hover:text-cream',
  pitch:
    'bg-pitch text-cream hover:bg-pitch-light shadow-pitch-glow',
  danger:
    'bg-danger text-cream hover:bg-red-700 shadow-sm'
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium',
        'transition-all duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tea',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.98]',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
