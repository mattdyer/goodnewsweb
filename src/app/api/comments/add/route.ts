import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    // Support both articleId and articleLink (backward compatibility)
    const articleId = body.articleId || body.articleLink;
    const { content } = body;
    
    if (!articleId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (content.length > 1000) {
      return NextResponse.json({ error: 'Comment too long (max 1000 characters)' }, { status: 400 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.serverToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId, content }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ error: errorData.error || 'Failed to add comment' }, { status: response.status });
    }
    
    const comment = await response.json();
    // Keep articleId as is (no mapping needed)
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
