import { describe, expect, it } from 'vitest';
import { isKettleReady, teaModeModifier } from '@/lib/domain/teaRules';

describe('teaRules', () => {
  it('enforces kettle readiness threshold', () => {
    expect(isKettleReady(64)).toBe(false);
    expect(isKettleReady(65)).toBe(true);
  });

  it('applies tea mode modifiers', () => {
    expect(teaModeModifier('Masala Chai')).toBeGreaterThan(0);
    expect(teaModeModifier('Herbal Infusion')).toBeLessThan(0);
  });
});
