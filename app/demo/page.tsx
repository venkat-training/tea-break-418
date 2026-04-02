import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className='mx-auto max-w-3xl p-8'>
      <h1 className='text-3xl font-bold'>Tea Break 418 Demo</h1>
      <ol className='mt-4 list-decimal space-y-2 pl-4 text-slate-700'>
        <li>Run Toss Analysis (expect HTTP 418 due to kettle readiness 58).</li>
        <li>Attempt Override Tea Protocol (always 418).</li>
        <li>Observe structured API response in Operations Response console.</li>
      </ol>
      <Link className='mt-6 inline-block text-pitch underline' href='/'>
        Return to dashboard
      </Link>
    </main>
  );
}
