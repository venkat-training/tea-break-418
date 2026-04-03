'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

type ConsolePayload = {
  success?: boolean;
  error?: {
    code?: string;
    title?: string;
    message?: string;
    recoveryAction?: string;
    details?: string[];
  };
  data?: Record<string, unknown>;
  meta?: {
    action?: string;
    httpStatus?: number | null;
    ok?: boolean;
    at?: string;
  };
};

function StatusChip({ status }: { status: number | null | undefined }) {
  if (!status) return null;
  const is418 = status === 418;
  const is200 = status >= 200 && status < 300;
  return (
    <span
      className={`rounded border px-2 py-0.5 font-mono text-xs font-semibold ${
        is418
          ? 'border-tea/30 bg-tea/10 text-tea-warm'
          : is200
          ? 'border-pitch-light/30 bg-pitch-light/10 text-pitch-light'
          : 'border-danger/30 bg-danger/10 text-danger'
      }`}
    >
      HTTP {status}
      {is418 && " 🫖"}
    </span>
  );
}

export function TeaActionConsole({ response }: { response: unknown }) {
  const preRef = useRef<HTMLPreElement>(null);
  const payload = response as ConsolePayload;

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = 0;
    }
  }, [response]);

  const timeStr = payload?.meta?.at
    ? new Date(payload.meta.at).toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    : null;

  return (
    <Card className='overflow-hidden p-0'>
      {/* Console header */}
      <div className='flex items-center justify-between border-b border-cream-deep bg-cream/60 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1.5'>
            <span className='h-3 w-3 rounded-full bg-danger/40' />
            <span className='h-3 w-3 rounded-full bg-tea-amber/40' />
            <span className='h-3 w-3 rounded-full bg-pitch-light/40' />
          </div>
          <span className='ml-1 font-mono text-xs text-muted'>operations_response.json</span>
        </div>
        <div className='flex items-center gap-2'>
          {payload?.meta?.action && (
            <span className='font-mono text-[11px] text-muted/60'>{payload.meta.action}</span>
          )}
          <StatusChip status={payload?.meta?.httpStatus} />
          {timeStr && (
            <span className='font-mono text-[11px] text-muted/50'>{timeStr}</span>
          )}
        </div>
      </div>

      {/* Alert banner for 418 */}
      {payload?.success === false && payload?.error?.message && (
        <div className='border-b border-tea/20 bg-tea/5 px-4 py-3'>
          <div className='flex items-start gap-3'>
            <span className='mt-0.5 text-base'>🫖</span>
            <div>
              <p className='font-mono text-xs font-semibold text-tea-warm'>
                {payload.error.code ?? 'TEA_BREAK_ENFORCED'}
                {payload.error.title ? ` — ${payload.error.title}` : ''}
              </p>
              <p className='mt-0.5 text-sm text-ink/80'>{payload.error.message}</p>
              {payload.error.details && payload.error.details.length > 0 && (
                <ul className='mt-1.5 space-y-0.5'>
                  {payload.error.details.map((d, i) => (
                    <li key={i} className='flex items-start gap-1.5 text-xs text-muted'>
                      <span className='mt-0.5 font-mono text-tea/60'>›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {payload.error.recoveryAction && (
                <p className='mt-1.5 font-mono text-[11px] text-muted/70'>
                  💡 {payload.error.recoveryAction}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* JSON Output */}
      <div className='relative bg-[#0f1a12]'>
        <div className='console-scanline relative'>
          <pre
            ref={preRef}
            aria-live='polite'
            aria-label='API response output'
            className='max-h-72 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-emerald-300'
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    </Card>
  );
}
