import { NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/schemas';
import { appendSubmission } from '@/lib/submissions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const entry = appendSubmission(parsed.data);
    // Simulate confirmation email
    // eslint-disable-next-line no-console
    console.log('Contact submission received:', parsed.data.email);
    return NextResponse.json({ ok: true, saved: !!entry });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

