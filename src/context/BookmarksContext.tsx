'use client';

import { ReactNode, createContext, useContext } from 'react';
import { useBookmarks, Bookmark } from '@/lib/useBookmarks';

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
  const bookmarksHook = useBookmarks();
  
  const value: BookmarksContextValue = {
    bookmarks: bookmarksHook.bookmarks,
    loading: bookmarksHook.loading,
    addBookmark: bookmarksHook.addBookmark,
    removeBookmark: bookmarksHook.removeBookmark,
    isBookmarked: bookmarksHook.isBookmarked,
    getBookmark: bookmarksHook.getBookmark,
    refetch: bookmarksHook.refetch,
  };

  return (
    <BookmarksContext.Provider value={value}>
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
