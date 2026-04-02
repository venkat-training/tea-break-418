'use client';

import { useMemo, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { TeaActionConsole } from '@/components/tea/TeaActionConsole';
import { TeapotBadge } from '@/components/tea/TeapotBadge';
import { TeaStatusPanel } from '@/components/tea/TeaStatusPanel';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';
import { computeComplianceScore } from '@/lib/domain/complianceEngine';

const actions = [
  'Recommend Batting Aggression',
  'Run Toss Analysis',
  'Approve Powerplay Acceleration',
  'Initiate Bowling Change',
  'Override Tea Protocol'
] as const;

export default function HomePage() {
  const [teaState, setTeaState] = useState(SEEDED_TEA);
  const [response, setResponse] = useState<unknown>({ success: true, data: { message: 'Awaiting tactical instruction.' } });
  const score = useMemo(() => computeComplianceScore(teaState), [teaState]);

  const runAction = async (action: (typeof actions)[number]) => {
    const res = await fetch('/api/tactical-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, teaState, matchState: SEEDED_MATCH })
    });
    const json = await res.json();
    setResponse(json);
  };

  return (
    <div>
      <AppHeader />
      <DashboardShell>
        <Hero />
        <TeapotBadge />
        <ScoreboardCard
          teams={SEEDED_MATCH.teams}
          score={SEEDED_MATCH.score}
          overs={SEEDED_MATCH.overs}
          requiredRate={SEEDED_MATCH.requiredRate}
          tossStatus={SEEDED_MATCH.tossStatus}
        />
        <SectionHeading title='Tea Compliance Engine' subtitle='Structured governance for cricket tactical operations.' />
        <TeaModeSelector value={teaState.teaMode} onChange={(mode) => setTeaState({ ...teaState, teaMode: mode as typeof teaState.teaMode })} />
        <MetricsGrid
          metrics={[
            { label: 'Tea Compliance Score', value: score },
            { label: 'Kettle Readiness Index', value: teaState.kettleReadiness },
            { label: 'Biscuit Coverage Ratio', value: teaState.biscuitCoverage }
          ]}
        />
        <div className='grid gap-4 md:grid-cols-2'>
          <TeaStatusPanel teaState={teaState} score={score} />
          <ComplianceCard title='Tea Mode' value={teaState.teaMode} />
        </div>
        <section className='grid gap-2 md:grid-cols-3'>
          {actions.map((action) => (
            <Button key={action} onClick={() => runAction(action)}>
              {action}
            </Button>
          ))}
        </section>
        <TeaActionConsole response={response} />
        <ComplianceAlerts />
      </DashboardShell>
      <Footer />
    </div>
  );
}
