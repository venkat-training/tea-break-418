import { Alert } from '@/components/ui/alert';
import { COMPLIANCE_ALERTS } from '@/lib/constants';

export function ComplianceAlerts() {
  return (
    <div className='grid gap-2'>
      <p className='font-mono text-[10px] uppercase tracking-widest text-muted'>
        System Alerts
      </p>
      {COMPLIANCE_ALERTS.map(({ kind, text }) => (
        <Alert key={text} kind={kind}>
          {text}
        </Alert>
      ))}
    </div>
  );
}
