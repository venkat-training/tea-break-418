import { NextResponse } from 'next/server';
import { SEEDED_TEA } from '@/lib/constants';
import { computeComplianceScore } from '@/lib/domain/complianceEngine';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { teaState: SEEDED_TEA, complianceScore: computeComplianceScore(SEEDED_TEA) }
  });
}
