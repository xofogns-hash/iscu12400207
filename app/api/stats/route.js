import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
    { status: 401 }
  );
}
