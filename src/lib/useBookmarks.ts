'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

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
  sentiment: { score: number; matchedKeywords: string[] };
  createdAt: string;
}

export function useBookmarks() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/bookmarks');
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      const data = await res.json();
      setBookmarks(data);
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
      const res = await fetch('/api/bookmarks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article, sentiment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add bookmark');
      }

      const bookmark = await res.json();
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
      const res = await fetch(`/api/bookmarks/remove?id=${bookmarkId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to remove bookmark');
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
