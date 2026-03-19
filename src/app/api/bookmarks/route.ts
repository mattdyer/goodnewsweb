import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/bookmarks`, {
      headers: {
        'Authorization': `Bearer ${session.user.id}`,
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: response.status });
    }
    
    const bookmarks = await response.json();
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}
