import { NextResponse } from 'next/server';
import { getWeddingConfig, saveWeddingConfig } from '@/lib/storage';

export async function GET() {
  try {
    const config = getWeddingConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wedding config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const success = saveWeddingConfig(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid config payload' }, { status: 400 });
  }
}
