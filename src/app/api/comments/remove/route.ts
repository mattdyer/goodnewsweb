import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');
    
    if (!commentId) {
      return NextResponse.json({ error: 'Missing comment ID' }, { status: 400 });
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.user.id}`,
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Comment not found or not authorized' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: response.status });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
