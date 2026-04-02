import { describe, expect, it } from 'vitest';
import { POST as tacticalPost } from '@/app/api/tactical-action/route';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('api routes', () => {
  it('returns 418 for override tea protocol', async () => {
    const req = new Request('http://localhost/api/tactical-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'Override Tea Protocol', teaState: SEEDED_TEA, matchState: SEEDED_MATCH })
    });
    const response = await tacticalPost(req);
    expect(response.status).toBe(418);
  });

  it('returns 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/tactical-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'bad' })
    });
    const response = await tacticalPost(req);
    expect(response.status).toBe(400);
  });
});
