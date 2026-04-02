import { Card } from '@/components/ui/card';

export function TeaActionConsole({ response }: { response: unknown }) {
  const payload = response as {
    success?: boolean;
    error?: { title?: string; message?: string };
    meta?: { action?: string; httpStatus?: number | null };
  };

  return (
    <Card>
      <h3 className='mb-2 font-semibold'>Operations Response</h3>
      <p className='mb-3 text-sm text-slate-600'>
        Latest action: <span className='font-medium text-ink'>{payload?.meta?.action ?? 'None yet'}</span>
        {payload?.meta?.httpStatus ? ` • HTTP ${payload.meta.httpStatus}` : ''}
      </p>
      {payload?.success === false && payload?.error?.message ? (
        <p className='mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900'>
          <span className='font-semibold'>{payload.error.title ?? 'Blocked'}:</span> {payload.error.message}
        </p>
      ) : null}
      <pre aria-live='polite' className='overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-200'>
        {JSON.stringify(response, null, 2)}
      </pre>
    </Card>
  );
}
