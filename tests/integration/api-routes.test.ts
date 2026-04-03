import { describe, expect, it } from 'vitest';
import { POST as tacticalPost } from '@/app/api/tactical-action/route';
import { POST as compliancePost } from '@/app/api/tea-compliance/route';
import { POST as tossPost } from '@/app/api/toss/route';
import { GET as teaStatusGet } from '@/app/api/tea-status/route';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

function makeRequest(body: unknown) {
  return new Request('http://localhost/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

describe('api/tactical-action', () => {
  it('returns 418 for Override Tea Protocol', async () => {
    const req = makeRequest({
      action: 'Override Tea Protocol',
      teaState: SEEDED_TEA,
      matchState: SEEDED_MATCH
    });
    const res = await tacticalPost(req);
    expect(res.status).toBe(418);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('TEA_BREAK_ENFORCED');
  });

  it('returns 400 for invalid payload', async () => {
    const req = makeRequest({ action: 'INVALID_ACTION' });
    const res = await tacticalPost(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('INVALID_PAYLOAD');
  });

  it('returns 400 for malformed JSON body', async () => {
    const req = new Request('http://localhost/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json'
    });
    const res = await tacticalPost(req);
    expect(res.status).toBe(400);
  });

  it('returns 418 with score and grade on block', async () => {
    const req = makeRequest({
      action: 'Override Tea Protocol',
      teaState: SEEDED_TEA,
      matchState: SEEDED_MATCH
    });
    const res = await tacticalPost(req);
    const json = await res.json();
    expect(json.score).toBeDefined();
    expect(json.grade).toBeDefined();
  });

  it('returns 200 for valid passing action', async () => {
    const req = makeRequest({
      action: 'Initiate Bowling Change',
      teaState: {
        teaMode: 'Masala Chai',
        kettleReadiness: 90,
        biscuitCoverage: 90,
        umpireHydration: 90,
        captainConfidence: 90
      },
      matchState: { ...SEEDED_MATCH, overs: 5 }
    });
    const res = await tacticalPost(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});

describe('api/tea-compliance', () => {
  it('returns compliance score for valid tea state', async () => {
    const req = makeRequest(SEEDED_TEA);
    const res = await compliancePost(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(typeof json.data.complianceScore).toBe('number');
  });

  it('returns compliance grade in response', async () => {
    const req = makeRequest(SEEDED_TEA);
    const res = await compliancePost(req);
    const json = await res.json();
    expect(['CRITICAL', 'WARNING', 'NOMINAL', 'OPTIMAL']).toContain(json.data.grade);
  });

  it('returns 400 for invalid tea state', async () => {
    const req = makeRequest({ teaMode: 'Rocket Fuel', kettleReadiness: 999 });
    const res = await compliancePost(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error.details).toBeDefined();
  });

  it('returns teaState echo in response', async () => {
    const req = makeRequest(SEEDED_TEA);
    const res = await compliancePost(req);
    const json = await res.json();
    expect(json.data.teaState).toMatchObject(SEEDED_TEA);
  });
});

describe('api/toss', () => {
  it('blocks toss with 200 and canonical 418 when kettle is not ready', async () => {
    const req = makeRequest({ teaState: SEEDED_TEA, matchState: SEEDED_MATCH });
    const res = await tossPost(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.data.canonicalStatus).toBe(418);
    expect(json.data.blocked).toBe(true);
  });

  it('includes grade in blocked toss response', async () => {
    const req = makeRequest({ teaState: SEEDED_TEA, matchState: SEEDED_MATCH });
    const res = await tossPost(req);
    const json = await res.json();
    expect(json.data.grade).toBeDefined();
  });

  it('returns 400 for invalid payload', async () => {
    const req = makeRequest({ teaState: null });
    const res = await tossPost(req);
    expect(res.status).toBe(400);
  });

  it('succeeds when kettle is ready', async () => {
    const readyTea = {
      teaMode: 'Masala Chai',
      kettleReadiness: 90,
      biscuitCoverage: 90,
      umpireHydration: 90,
      captainConfidence: 90
    };
    const req = makeRequest({ teaState: readyTea, matchState: { ...SEEDED_MATCH, overs: 5 } });
    const res = await tossPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});

describe('api/tea-status', () => {
  it('returns seeded tea state and compliance score', async () => {
    const res = await teaStatusGet();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.teaState).toBeDefined();
    expect(typeof json.data.complianceScore).toBe('number');
  });
});
