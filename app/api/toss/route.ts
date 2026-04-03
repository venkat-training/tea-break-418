import { NextResponse } from 'next/server';
import { complianceRequestSchema } from '@/lib/schemas/api';
import { runTossAnalysis } from '@/lib/domain/tossEngine';

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
          recoveryAction: 'Check Content-Type header.'
        }
      },
      { status: 400 }
    );
  }

  const parsed = complianceRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_PAYLOAD',
          title: 'Validation failed',
          message: 'Payload validation failed.',
          recoveryAction: 'Review request schema.',
          details: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
        }
      },
      { status: 400 }
    );
  }

  const result = runTossAnalysis(parsed.data.teaState, parsed.data.matchState);

  if (!result.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: result.error,
        data: {
          blocked: true,
          complianceScore: result.score,
          grade: result.grade,
          reasons: result.reasons,
          canonicalStatus: 418
        }
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}
