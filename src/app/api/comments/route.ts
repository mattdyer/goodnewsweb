export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');
    
    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId parameter' }, { status: 400 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/comments?articleId=${encodeURIComponent(articleId)}`, {
      headers: session?.serverToken ? { 'Authorization': `Bearer ${session.serverToken}` } : {},
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: response.status });
    }
    
    const comments = await response.json();
    const mappedComments = comments.map((c: any) => ({
      ...c,
      articleLink: c.articleId,
    }));
    return NextResponse.json(mappedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
