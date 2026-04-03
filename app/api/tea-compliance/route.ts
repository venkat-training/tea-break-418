import { NextResponse } from 'next/server';
import { teaStateSchema } from '@/lib/schemas/domain';
import { computeComplianceScore, getComplianceGrade } from '@/lib/domain/complianceEngine';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (body === null) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_JSON',
          title: 'Malformed request',
          message: 'Request body must be valid JSON.',
          recoveryAction: 'Check Content-Type header and body format.'
        }
      },
      { status: 400 }
    );
  }

  const parsed = teaStateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PAYLOAD',
          title: 'Validation failed',
          message: 'Payload does not match the TeaState schema.',
          recoveryAction: 'Review request schema.',
          details: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
        }
      },
      { status: 400 }
    );
  }

  const complianceScore = computeComplianceScore(parsed.data);
  const grade = getComplianceGrade(complianceScore);

  return NextResponse.json({
    success: true,
    data: { complianceScore, grade, teaState: parsed.data }
  });
}
