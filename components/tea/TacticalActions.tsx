'use client';

import { Button } from '@/components/ui/button';

const ACTIONS = [
  {
    id: 'Recommend Batting Aggression',
    label: 'Batting Aggression',
    icon: '🏏',
    description: 'Requires 50%+ biscuit coverage',
    risk: 'medium'
  },
  {
    id: 'Run Toss Analysis',
    label: 'Toss Analysis',
    icon: '🪙',
    description: 'Requires 65%+ kettle readiness',
    risk: 'medium'
  },
  {
    id: 'Approve Powerplay Acceleration',
    label: 'Powerplay Accel.',
    icon: '⚡',
    description: 'Requires 55%+ umpire hydration',
    risk: 'high'
  },
  {
    id: 'Initiate Bowling Change',
    label: 'Bowling Change',
    icon: '🎯',
    description: 'Requires 60%+ captain confidence',
    risk: 'medium'
  },
  {
    id: 'Override Tea Protocol',
    label: 'Override Tea Protocol',
    icon: '🚫',
    description: 'Always blocked — RFC 2324 §2.3.1',
    risk: 'critical'
  }
] as const;

const riskStyles = {
  medium: 'border-cream-deep text-ink hover:border-pitch/30 hover:bg-pitch/5',
  high: 'border-tea-amber/30 text-ink hover:border-tea-amber/50 hover:bg-tea-amber/5',
  critical: 'border-danger/30 text-danger hover:border-danger/60 hover:bg-danger/5'
};

interface TacticalActionsProps {
  onAction: (action: (typeof ACTIONS)[number]['id']) => void;
  isBusy: boolean;
  pendingAction: string | null;
}

export function TacticalActions({ onAction, isBusy, pendingAction }: TacticalActionsProps) {
  return (
    <div className='space-y-2'>
      <p className='font-mono text-[10px] uppercase tracking-widest text-muted'>
        Available Tactical Actions
      </p>
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {ACTIONS.map((action) => {
          const isPending = pendingAction === action.id;
          return (
            <button
              key={action.id}
              disabled={isBusy}
              onClick={() => onAction(action.id)}
              className={`group flex items-start gap-3 rounded-xl border bg-white p-3.5 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-tea ${riskStyles[action.risk]}`}
            >
              <span className='mt-0.5 shrink-0 text-xl leading-none'>{action.icon}</span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold leading-tight'>
                  {isPending ? (
                    <span className='flex items-center gap-1.5'>
                      <span className='inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent' />
                      Running…
                    </span>
                  ) : (
                    action.label
                  )}
                </p>
                <p className='mt-0.5 font-mono text-[10px] text-muted'>{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
