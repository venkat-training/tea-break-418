import { Card } from '@/components/ui/card';

export function ScoreboardCard({ teams, score, overs, requiredRate, tossStatus }: { teams: string; score: string; overs: number; requiredRate: number; tossStatus: string }) {
  return (
    <Card>
      <h3 className='text-lg font-semibold text-ink'>{teams}</h3>
      <div className='mt-3 grid grid-cols-2 gap-3 text-sm'>
        <p>Score: <strong>{score}</strong></p>
        <p>Overs: <strong>{overs}</strong></p>
        <p>Req. Rate: <strong>{requiredRate}</strong></p>
        <p>Toss: <strong>{tossStatus}</strong></p>
      </div>
    </Card>
  );
}
