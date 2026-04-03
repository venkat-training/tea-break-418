'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ComplianceAlerts } from '@/components/alerts/ComplianceAlerts';
import { ComplianceCard } from '@/components/compliance/ComplianceCard';
import { TeaModeSelector } from '@/components/compliance/TeaModeSelector';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Hero } from '@/components/dashboard/Hero';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { ScoreboardCard } from '@/components/scoreboard/ScoreboardCard';
import { AppHeader } from '@/components/shared/AppHeader';
import { Footer } from '@/components/shared/Footer';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { TeaActionConsole } from '@/components/tea/TeaActionConsole';
import { TeapotBadge } from '@/components/tea/TeapotBadge';
import { TeaStatusPanel } from '@/components/tea/TeaStatusPanel';
import { TacticalActions } from '@/components/tea/TacticalActions';
import { KettleSliders } from '@/components/tea/KettleSliders';
import { TeaFactTicker } from '@/components/tea/TeaFactTicker';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';
import { computeComplianceScore } from '@/lib/domain/complianceEngine';
import type { TeaState } from '@/lib/schemas/domain';

const TACTICAL_ACTIONS = [
  'Recommend Batting Aggression',
  'Run Toss Analysis',
  'Approve Powerplay Acceleration',
  'Initiate Bowling Change',
  'Override Tea Protocol'
] as const;

type TacticalActionId = (typeof TACTICAL_ACTIONS)[number];

type ConsoleResponse = {
  success?: boolean;
  error?: { code?: string; title?: string; message?: string; recoveryAction?: string; details?: string[] };
  data?: Record<string, unknown>;
  meta?: { action?: string; httpStatus?: number | null; ok?: boolean; at?: string };
};

const INITIAL_RESPONSE: ConsoleResponse = {
  success: true,
  data: { message: 'Awaiting tactical instruction. Tea governance is standing by.' }
};

export default function HomePage() {
  const router = useRouter();
  const [teaState, setTeaState] = useState<TeaState>(SEEDED_TEA);
  const [response, setResponse] = useState<ConsoleResponse>(INITIAL_RESPONSE);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const score = useMemo(() => computeComplianceScore(teaState), [teaState]);

  const callApi = useCallback(async (label: string, url: string, body: unknown) => {
    setPendingAction(label);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json().catch(() => ({}));
      setResponse({
        ...json,
        meta: {
          action: label,
          httpStatus: res.status,
          ok: res.ok,
          at: new Date().toISOString()
        }
      });
    } catch {
      setResponse({
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          title: 'Request failed',
          message: 'Could not reach API route. Check dev server logs and retry.',
          recoveryAction: 'Ensure local server is running and reachable.'
        },
        meta: {
          action: label,
          httpStatus: null,
          ok: false,
          at: new Date().toISOString()
        }
      });
    } finally {
      setPendingAction(null);
    }
  }, []);

  const runAction = useCallback(
    (action: TacticalActionId) => {
      callApi(action, '/api/tactical-action', {
        action,
        teaState,
        matchState: SEEDED_MATCH
      });
    },
    [callApi, teaState]
  );

  const handleStartMatch = useCallback(() => {
    callApi('Start Match', '/api/toss', { teaState, matchState: SEEDED_MATCH });
  }, [callApi, teaState]);

  const handleTriggerAudit = useCallback(() => {
    callApi('Trigger Emergency Tea Audit', '/api/tea-compliance', teaState);
  }, [callApi, teaState]);

  const handleViewDemo = useCallback(() => {
    router.push('/demo');
  }, [router]);

  const handleSliderChange = useCallback(
    (key: keyof Omit<TeaState, 'teaMode'>, value: number) => {
      setTeaState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const isBusy = Boolean(pendingAction);

  return (
    <div className='min-h-screen'>
      <AppHeader />
      <DashboardShell>
        {/* Hero */}
        <Hero
          isBusy={isBusy}
          onStartMatch={handleStartMatch}
          onTriggerAudit={handleTriggerAudit}
          onViewDemo={handleViewDemo}
        />

        {/* Status bar */}
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <TeapotBadge />
          {isBusy && (
            <p className='flex items-center gap-1.5 font-mono text-xs text-muted'>
              <span className='inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent' />
              Running: {pendingAction}…
            </p>
          )}
        </div>

        {/* Scoreboard */}
        <ScoreboardCard
          teams={SEEDED_MATCH.teams}
          score={SEEDED_MATCH.score}
          overs={SEEDED_MATCH.overs}
          requiredRate={SEEDED_MATCH.requiredRate}
          tossStatus={SEEDED_MATCH.tossStatus}
          format={SEEDED_MATCH.format}
          matchStatus={SEEDED_MATCH.matchStatus}
        />

        {/* Compliance Engine */}
        <SectionHeading
          tag='Core Engine'
          title='Tea Compliance Engine'
          subtitle='Structured governance for cricket tactical operations. All actions evaluated in real-time.'
        />

        {/* Tea Mode Selector */}
        <TeaModeSelector
          value={teaState.teaMode}
          onChange={(mode) => setTeaState((prev) => ({ ...prev, teaMode: mode }))}
        />

        {/* Metrics */}
        <MetricsGrid
          metrics={[
            {
              label: 'Tea Compliance Score',
              value: score,
              icon: '📊',
              description: 'Weighted composite: kettle 35%, biscuit 25%, hydration 20%, confidence 20%'
            },
            {
              label: 'Kettle Readiness Index',
              value: teaState.kettleReadiness,
              icon: '🫖',
              description: 'Critical path metric. Gate for toss analysis and tactical approvals.'
            },
            {
              label: 'Biscuit Coverage Ratio',
              value: teaState.biscuitCoverage,
              icon: '🍪',
              description: 'Required for batting aggression authorization.'
            }
          ]}
        />

        {/* Status + Controls */}
        <div className='grid gap-4 md:grid-cols-2'>
          <TeaStatusPanel teaState={teaState} score={score} />
          <div className='paper-card rounded-2xl p-4'>
            <KettleSliders teaState={teaState} onChange={handleSliderChange} />
            <div className='mt-4 border-t border-cream-deep pt-4'>
              <ComplianceCard title='Active Tea Mode' value={teaState.teaMode} />
            </div>
          </div>
        </div>

        {/* Tactical Actions */}
        <SectionHeading
          tag='Operations'
          title='Tactical Action Console'
          subtitle='Submit decisions to the Tea Compliance Engine. Results appear in the response console below.'
        />
        <TacticalActions
          onAction={runAction}
          isBusy={isBusy}
          pendingAction={pendingAction}
        />

        {/* Response console */}
        <TeaActionConsole response={response} />

        {/* Info row */}
        <div className='grid gap-4 md:grid-cols-2'>
          <ComplianceAlerts />
          <TeaFactTicker />
        </div>
      </DashboardShell>
      <Footer />
    </div>
  );
}
