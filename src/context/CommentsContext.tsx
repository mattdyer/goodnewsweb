'use client';

import { ReactNode, createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export interface Comment {
  id: string;
  articleLink: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface CommentsContextValue {
  articleComments: Map<string, Comment[]>;
  loading: boolean;
  fetchComments: (articleLink: string) => Promise<Comment[]>;
  addComment: (articleLink: string, content: string) => Promise<Comment | null>;
  removeComment: (commentId: string, articleLink: string) => Promise<boolean>;
  getCommentCount: (articleLink: string) => number;
}

const CommentsContext = createContext<CommentsContextValue | null>(null);

export function CommentsProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [articleComments, setArticleComments] = useState<Map<string, Comment[]>>(new Map());
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async (articleLink: string): Promise<Comment[]> => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments?article=${encodeURIComponent(articleLink)}`);
      if (res.ok) {
        const comments: Comment[] = await res.json();
        setArticleComments(prev => {
          const next = new Map(prev);
          next.set(articleLink, comments);
          return next;
        });
        return comments;
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
    return [];
  }, []);

  const addComment = useCallback(async (articleLink: string, content: string): Promise<Comment | null> => {
    if (!session?.user?.id) return null;

    try {
      const res = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleLink, content }),
      });

      if (res.ok) {
        const comment: Comment = await res.json();
        setArticleComments(prev => {
          const next = new Map(prev);
          const existing = next.get(articleLink) || [];
          next.set(articleLink, [...existing, comment]);
          return next;
        });
        return comment;
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
    return null;
  }, [session?.user?.id]);

  const removeComment = useCallback(async (commentId: string, articleLink: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    try {
      const res = await fetch(`/api/comments/remove?id=${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setArticleComments(prev => {
          const next = new Map(prev);
          const existing = next.get(articleLink) || [];
          next.set(articleLink, existing.filter(c => c.id !== commentId));
          return next;
        });
        return true;
      }
    } catch (error) {
      console.error('Failed to remove comment:', error);
    }
    return false;
  }, [session?.user?.id]);

  const getCommentCount = useCallback((articleLink: string): number => {
    return articleComments.get(articleLink)?.length || 0;
  }, [articleComments]);

  return (
    <CommentsContext.Provider
      value={{
        articleComments,
        loading,
        fetchComments,
        addComment,
        removeComment,
        getCommentCount,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useCommentsContext must be used within CommentsProvider');
  }
  return context;
}
