import { NextResponse } from 'next/server';
import { getPreferences, savePreferences } from '@/lib/preferences';
import { UserPreferences } from '@/types/user';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const preferences = getPreferences(userId);

  return NextResponse.json({ preferences });
}

export async function PUT(request: Request) {
  try {
    const preferences: UserPreferences = await request.json();

    if (!preferences.userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const saved = savePreferences(preferences);

    return NextResponse.json({ preferences: saved });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
