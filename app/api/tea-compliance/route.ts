import { NextResponse } from 'next/server';
import { complianceRequestSchema } from '@/lib/schemas/api';
import { computeComplianceScore } from '@/lib/domain/complianceEngine';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = complianceRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_PAYLOAD', title: 'Invalid request', message: 'Payload validation failed.', recoveryAction: 'Review request schema.' } }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: { complianceScore: computeComplianceScore(parsed.data.teaState) }
  });
}
