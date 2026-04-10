export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/comments`, {
      headers: {
        'Authorization': `Bearer ${session.serverToken}`,
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: response.status });
    }
    
    const allComments = await response.json();
    const mappedComments = allComments.map((c: any) => ({
      ...c,
      articleLink: c.articleId,
    }));
    const userComments = mappedComments.filter((c: any) => c.userId === session.user.id);
    
    return NextResponse.json(userComments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
