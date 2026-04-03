import { Card } from '@/components/ui/card';

interface ScoreboardCardProps {
  teams: string;
  score: string;
  overs: number;
  requiredRate: number;
  tossStatus: string;
  format?: string;
  matchStatus?: string;
}

export function ScoreboardCard({
  teams,
  score,
  overs,
  requiredRate,
  tossStatus,
  format = 'T20',
  matchStatus
}: ScoreboardCardProps) {
  const [team1, team2] = teams.split(' vs ');

  return (
    <Card variant='pitch' className='overflow-hidden'>
      {/* Match format strip */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='rounded border border-willow/30 bg-willow/10 px-2 py-0.5 font-mono text-[11px] font-medium text-willow'>
            {format}
          </span>
          {matchStatus && (
            <span className='font-mono text-xs text-cream/50'>{matchStatus}</span>
          )}
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-tea-amber' />
          <span className='font-mono text-[11px] text-cream/60'>LIVE</span>
        </div>
      </div>

      {/* Teams */}
      <div className='mb-5'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex-1'>
            <p className='font-mono text-[10px] uppercase tracking-widest text-cream/40'>HOME</p>
            <p className='font-display text-lg font-bold leading-tight text-cream'>
              {team1?.trim()}
            </p>
          </div>
          <div className='flex-shrink-0 rounded-full bg-cream/10 px-3 py-1'>
            <span className='font-mono text-xs font-medium text-cream/60'>vs</span>
          </div>
          <div className='flex-1 text-right'>
            <p className='font-mono text-[10px] uppercase tracking-widest text-cream/40'>AWAY</p>
            <p className='font-display text-lg font-bold leading-tight text-cream'>
              {team2?.trim()}
            </p>
          </div>
        </div>
      </div>

      {/* Score display */}
      <div className='rounded-xl bg-cream/5 p-4'>
        <p className='font-mono text-[10px] uppercase tracking-widest text-cream/40'>Score</p>
        <p className='score-shimmer font-display text-4xl font-black'>{score}</p>
      </div>

      {/* Stats row */}
      <div className='mt-3 grid grid-cols-3 gap-2'>
        {[
          { label: 'Overs', value: overs.toFixed(1) },
          { label: 'Req. Rate', value: requiredRate.toFixed(1) },
          { label: 'Toss', value: tossStatus }
        ].map((stat) => (
          <div key={stat.label} className='rounded-lg bg-cream/5 p-2.5 text-center'>
            <p className='font-mono text-[10px] text-cream/40'>{stat.label}</p>
            <p className='mt-0.5 font-mono text-sm font-medium text-cream'>{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
