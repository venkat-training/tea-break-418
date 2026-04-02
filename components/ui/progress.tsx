import * as React from 'react';

export function Progress({ value }: { value: number }) {
  return (
    <div className='h-2 w-full rounded-full bg-slate-100'>
      <div className='h-2 rounded-full bg-pitch' style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
