import { NextResponse } from 'next/server';
import { tacticalActionSchema } from '@/lib/schemas/api';
import { evaluateAction } from '@/lib/domain/complianceEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (body === null) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_JSON',
            title: 'Malformed request',
            message: 'Request body must be valid JSON.',
            recoveryAction: 'Check Content-Type and body format.'
          }
        },
        { status: 400 }
      );
    }

    const parsed = tacticalActionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PAYLOAD',
            title: 'Validation failed',
            message: 'Payload does not match the expected schema.',
            recoveryAction: 'Review request schema for action, teaState, and matchState.',
            details: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
          }
        },
        { status: 400 }
      );
    }

    const result = evaluateAction(
      parsed.data.action,
      parsed.data.teaState,
      parsed.data.matchState
    );

    if (!result.allowed) {
      return NextResponse.json(
        { success: false, status: 418, error: result.error, score: result.score, grade: result.grade },
        { status: 418 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          title: 'Server error',
          message: 'Unexpected error while processing tactical action.',
          recoveryAction: 'Retry request. If the issue persists, check server logs.'
        }
      },
      { status: 500 }
    );
  }
}
