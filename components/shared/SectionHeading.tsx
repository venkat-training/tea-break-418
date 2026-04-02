export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className='mb-3'>
      <h2 className='text-xl font-semibold text-ink'>{title}</h2>
      {subtitle ? <p className='text-sm text-slate-600'>{subtitle}</p> : null}
    </div>
  );
}
