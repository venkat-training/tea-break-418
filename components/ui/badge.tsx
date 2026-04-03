import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-tea/20 bg-tea/10 px-3 py-1 font-mono text-xs font-semibold text-tea',
        className
      )}
      {...props}
    />
  );
}
