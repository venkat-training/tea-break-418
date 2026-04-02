import type { ReactNode } from 'react';

export function DashboardShell({ children }: { children: ReactNode }) {
  return <main className='mx-auto grid max-w-6xl gap-6 px-6 py-8'>{children}</main>;
}
