import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { article, sentiment } = body;
    
    if (!article || !article.link) {
      return NextResponse.json({ error: 'Invalid article data' }, { status: 400 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/bookmarks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.user.id}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId: article.link,
        title: article.title,
        link: article.link,
        source: article.source,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 409) {
        return NextResponse.json({ error: 'Article already bookmarked' }, { status: 409 });
      }
      return NextResponse.json({ error: errorData.error || 'Failed to add bookmark' }, { status: response.status });
    }
    
    const bookmark = await response.json();
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}
