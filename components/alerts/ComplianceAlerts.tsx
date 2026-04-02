import { Alert } from '@/components/ui/alert';

const alerts = [
  ['warning', 'Biscuit inventory below acceptable operational threshold.'],
  ['info', 'Third umpire requested stronger chai.'],
  ['success', 'Tea service stabilized. Tactical actions may proceed.']
] as const;

export function ComplianceAlerts() {
  return (
    <div className='grid gap-2'>
      {alerts.map(([kind, text]) => (
        <Alert key={text} className={kind === 'warning' ? 'border-amber-300 bg-amber-50' : kind === 'success' ? 'border-emerald-300 bg-emerald-50' : 'border-sky-300 bg-sky-50'}>
          {text}
        </Alert>
      ))}
    </div>
  );
}
