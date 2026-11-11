import { NextResponse } from 'next/server';
import { getRSVPs, saveRSVP } from '@/lib/storage';

export async function GET() {
  try {
    const list = getRSVPs();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, attendance, side, plusOnes, dietaryRestrictions, message } = body;

    if (!fullName || !attendance || !side) {
      return NextResponse.json(
        { error: 'Full name, attendance, and side are required' },
        { status: 400 }
      );
    }

    const created = saveRSVP({
      fullName: String(fullName).trim(),
      email: email ? String(email).trim() : undefined,
      attendance: attendance === 'yes' ? 'yes' : 'no',
      side: side === 'bride' ? 'bride' : side === 'groom' ? 'groom' : 'both',
      plusOnes: Number(plusOnes) || 0,
      dietaryRestrictions: dietaryRestrictions ? String(dietaryRestrictions).trim() : '',
      message: message ? String(message).trim() : '',
    });

    return NextResponse.json({ success: true, rsvp: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid RSVP payload' }, { status: 400 });
  }
}
