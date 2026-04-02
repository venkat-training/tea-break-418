import { NextResponse } from 'next/server';
import { tacticalActionSchema } from '@/lib/schemas/api';
import { evaluateAction } from '@/lib/domain/complianceEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = tacticalActionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_PAYLOAD', title: 'Invalid request', message: 'Payload validation failed.', recoveryAction: 'Review request schema.' } }, { status: 400 });
    }

    const result = evaluateAction(parsed.data.action, parsed.data.teaState, parsed.data.matchState);

    if (!result.allowed) {
      return NextResponse.json({ success: false, status: 418, error: result.error }, { status: 418 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch {
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_SERVER_ERROR', title: 'Server error', message: 'Unexpected error while processing tactical action.', recoveryAction: 'Retry request.' } }, { status: 500 });
  }
}
