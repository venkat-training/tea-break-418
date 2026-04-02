import { describe, expect, it } from 'vitest';
import { evaluateAction } from '@/lib/domain/complianceEngine';
import { SEEDED_MATCH, SEEDED_TEA } from '@/lib/constants';

describe('complianceEngine', () => {
  it('blocks override action with 418', () => {
    const result = evaluateAction('Override Tea Protocol', SEEDED_TEA, SEEDED_MATCH);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(418);
  });
});
