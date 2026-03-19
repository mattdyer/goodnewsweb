'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Bookmark } from '@/lib/useBookmarks';

interface BookmarksContextValue {
  bookmarks: Bookmark[];
  loading: boolean;
  addBookmark: (article: Bookmark['article'], sentiment: Bookmark['sentiment']) => Promise<Bookmark>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
  isBookmarked: (articleLink: string) => boolean;
  getBookmark: (articleLink: string) => Bookmark | undefined;
  refetch: () => Promise<void>;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    if (!session?.user?.id) {
      setBookmarks([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/bookmarks');
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const addBookmark = async (article: Bookmark['article'], sentiment: Bookmark['sentiment']): Promise<Bookmark> => {
    if (!session?.user?.id) throw new Error('Must be logged in');

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
  };

  const removeBookmark = async (bookmarkId: string): Promise<void> => {
    if (!session?.user?.id) throw new Error('Must be logged in');

    const res = await fetch(`/api/bookmarks/remove?id=${bookmarkId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to remove bookmark');
    }

    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const isBookmarked = (articleLink: string): boolean => {
    return bookmarks.some(b => b.article.link === articleLink);
  };

  const getBookmark = (articleLink: string): Bookmark | undefined => {
    return bookmarks.find(b => b.article.link === articleLink);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        loading,
        addBookmark,
        removeBookmark,
        isBookmarked,
        getBookmark,
        refetch: fetchBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarksContext must be used within BookmarksProvider');
  }
  return context;
}
