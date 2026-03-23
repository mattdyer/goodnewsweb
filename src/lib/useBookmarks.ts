'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';

export interface Bookmark {
  id: string;
  userId: string;
  article: {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    source: string;
    category?: string;
  };
  sentiment: { score: number; isPositive: boolean; label: string; matchedKeywords: string[] };
  createdAt: string;
}

// In-memory sentiment storage (persists across re-renders but lost on page refresh)
const sentimentMap = new Map<string, Bookmark['sentiment']>();

export function useBookmarks() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      const result = await api.bookmarks.getAll();
      if (result.error) throw new Error(result.error);
      
      const serverBookmarks = result.data || [];
      // Map server bookmarks to our Bookmark interface with sentiment
      const mappedBookmarks: Bookmark[] = serverBookmarks.map(sb => ({
        id: sb.id,
        userId: sb.userId,
        article: {
          title: sb.title,
          link: sb.link,
          pubDate: '', // Not available from server
          description: '', // Not available from server
          source: sb.source,
          category: undefined,
        },
        sentiment: sentimentMap.get(sb.link) || {
          score: 0,
          isPositive: false,
          label: 'neutral',
          matchedKeywords: [],
        },
        createdAt: sb.createdAt,
      }));
      setBookmarks(mappedBookmarks.filter(b => b.article));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [session?.user?.id, fetchBookmarks]);

  const addBookmark = async (article: Bookmark['article'], sentiment: Bookmark['sentiment']) => {
    if (!session?.user?.id) {
      throw new Error('Must be logged in to bookmark');
    }

    try {
      const response = await fetch('/api/bookmarks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article, sentiment }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add bookmark');
      }
      
      const serverBookmark = await response.json();
      // Store sentiment locally
      sentimentMap.set(article.link, sentiment);
      
      const bookmark: Bookmark = {
        id: serverBookmark.id,
        userId: serverBookmark.userId,
        article,
        sentiment,
        createdAt: serverBookmark.createdAt,
      };
      setBookmarks(prev => [...prev, bookmark]);
      return bookmark;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add bookmark');
      throw err;
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    if (!session?.user?.id) {
      throw new Error('Must be logged in to remove bookmark');
    }

    try {
      const response = await fetch(`/api/bookmarks/remove?id=${bookmarkId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to remove bookmark');
      }
      
      // Remove sentiment from map (we need to know which article link corresponds to bookmarkId)
      // We'll find the bookmark in our state to get the link
      const bookmark = bookmarks.find(b => b.id === bookmarkId);
      if (bookmark) {
        sentimentMap.delete(bookmark.article.link);
      }
      
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove bookmark');
      throw err;
    }
  };

  const isBookmarked = (articleLink: string): boolean => {
    return bookmarks.some(b => b.article.link === articleLink);
  };

  const getBookmark = (articleLink: string): Bookmark | undefined => {
    return bookmarks.find(b => b.article.link === articleLink);
  };

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmark,
    refetch: fetchBookmarks,
  };
}
