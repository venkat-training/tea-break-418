import { NextResponse } from 'next/server';
import { complianceRequestSchema } from '@/lib/schemas/api';
import { runTossAnalysis } from '@/lib/domain/tossEngine';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = complianceRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_PAYLOAD', title: 'Invalid request', message: 'Payload validation failed.', recoveryAction: 'Review request schema.' } }, { status: 400 });
  }

  const result = runTossAnalysis(parsed.data.teaState, parsed.data.matchState);
  if (!result.allowed) {
    return NextResponse.json({ success: false, error: result.error }, { status: 418 });
  }
  return NextResponse.json({ success: true, data: result.data });
}
