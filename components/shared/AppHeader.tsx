import { APP_NAME } from '@/lib/constants';

export function AppHeader() {
  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <h1 className='text-lg font-bold text-ink'>{APP_NAME}</h1>
        <span className='text-xs text-slate-500'>Enterprise Tea Governance Console</span>
      </div>
    </header>
  );
}
