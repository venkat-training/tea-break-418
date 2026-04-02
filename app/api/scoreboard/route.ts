import { NextResponse } from 'next/server';
import { getSeededDashboard } from '@/lib/domain/matchEngine';

export async function POST() {
  return NextResponse.json({ success: true, data: getSeededDashboard() });
}
