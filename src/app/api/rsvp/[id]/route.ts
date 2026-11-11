import { NextResponse } from 'next/server';
import { deleteRSVP } from '@/lib/storage';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = deleteRSVP(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete RSVP' }, { status: 500 });
  }
}
