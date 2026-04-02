import { Card } from '@/components/ui/card';

export function TeaActionConsole({ response }: { response: unknown }) {
  return (
    <Card>
      <h3 className='mb-2 font-semibold'>Operations Response</h3>
      <pre aria-live='polite' className='overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-200'>
        {JSON.stringify(response, null, 2)}
      </pre>
    </Card>
  );
}
