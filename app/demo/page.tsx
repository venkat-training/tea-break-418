import Link from 'next/link';

export default function DemoPage() {
  const steps = [
    {
      n: 1,
      title: 'Observe Toss Block',
      detail:
        'Click "Start Match". Expect a tea-policy block because kettle readiness is 58% — below the 65% threshold. HTTP 418 fires.'
    },
    {
      n: 2,
      title: 'Audit Tea State',
      detail:
        'Click "Emergency Tea Audit". The engine returns the current compliance score as a weighted composite.'
    },
    {
      n: 3,
      title: 'Adjust Parameters',
      detail:
        'Use the Kettle Readiness slider on the dashboard to raise it above 65%. Then re-run Toss Analysis — it will succeed.'
    },
    {
      n: 4,
      title: 'Switch Tea Mode',
      detail:
        'Select "Herbal Infusion" from the Tea Mode selector. Watch the compliance score drop by 8 points. Masala Chai gives a +5 bonus.'
    },
    {
      n: 5,
      title: 'Attempt Override',
      detail:
        'Click "Override Tea Protocol" from the Tactical Actions grid. This ALWAYS returns 418 — the RFC is non-bypassable.'
    },
    {
      n: 6,
      title: 'Inspect Response Console',
      detail:
        'Each action streams a structured JSON payload with HTTP status, error details, and recovery guidance. The 418 teapot is first-class.'
    }
  ];

  return (
    <main className='min-h-screen bg-cream'>
      <div className='mx-auto max-w-3xl px-6 py-12'>
        {/* Header */}
        <div className='mb-10'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-tea/20 bg-tea/5 px-3 py-1.5'>
            <span className='font-mono text-xs text-tea'>Demo Script</span>
          </div>
          <h1 className='font-display text-4xl font-black text-ink'>
            Tea Break 418 <span className='italic text-tea'>Demo</span>
          </h1>
          <p className='mt-3 text-muted'>
            A guided walkthrough of the Tea Compliance Engine and its 418 governance policies.
          </p>
        </div>

        {/* Steps */}
        <ol className='space-y-4'>
          {steps.map((step) => (
            <li
              key={step.n}
              className='flex gap-4 rounded-2xl border border-cream-deep bg-white p-5 shadow-card'
            >
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pitch text-sm font-bold text-cream font-mono'>
                {step.n}
              </div>
              <div>
                <p className='font-semibold text-ink'>{step.title}</p>
                <p className='mt-1 text-sm text-muted'>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Back link */}
        <div className='mt-10 flex items-center gap-4'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-xl bg-pitch px-5 py-2.5 text-sm font-semibold text-cream shadow-pitch-glow transition hover:bg-pitch-light'
          >
            ← Return to Dashboard
          </Link>
          <p className='font-mono text-xs text-muted'>HTTP 418 awaits.</p>
        </div>
      </div>
    </main>
  );
}
