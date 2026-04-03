export function SectionHeading({
  title,
  subtitle,
  tag
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div className='flex items-end justify-between border-b border-cream-deep pb-3'>
      <div>
        {tag && (
          <p className='mb-1 font-mono text-[10px] uppercase tracking-widest text-muted'>{tag}</p>
        )}
        <h2 className='font-display text-xl font-bold text-ink'>{title}</h2>
        {subtitle && <p className='mt-0.5 text-sm text-muted'>{subtitle}</p>}
      </div>
    </div>
  );
}
