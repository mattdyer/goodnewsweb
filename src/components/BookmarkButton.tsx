'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bookmark } from '@/lib/useBookmarks';
import { api } from '@/lib/api';

interface BookmarkButtonProps {
  article: {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    source: string;
    category?: string;
  };
  sentiment: { score: number; isPositive: boolean; label: string; matchedKeywords: string[] };
  bookmarks: Bookmark[];
  onBookmarkAdded: (bookmark: Bookmark) => void;
  onBookmarkRemoved: (bookmarkId: string) => void;
}

export default function BookmarkButton({
  article,
  sentiment,
  bookmarks,
  onBookmarkAdded,
  onBookmarkRemoved,
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const existingBookmark = bookmarks.find(b => b.article && b.article.link === article.link);

  const handleClick = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      if (existingBookmark) {
        const result = await api.bookmarks.remove(existingBookmark.id);
        if (!result.error) {
          onBookmarkRemoved(existingBookmark.id);
        }
      } else {
        const result = await api.bookmarks.add(
          article.link,
          article.title,
          article.link,
          article.source
        );
        if (result.data) {
          const bookmark: Bookmark = {
            id: result.data.id,
            userId: session.user.id,
            article,
            sentiment,
            createdAt: result.data.createdAt,
          };
          onBookmarkAdded(bookmark);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = !!existingBookmark;

  return (
    <button
      onClick={handleClick}
      disabled={loading || !session}
      className={`p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 ${
        isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-yellow-500'
      } ${!session ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} ${loading ? 'opacity-50' : ''}`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={!session ? 'Sign in to bookmark' : isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${isBookmarked ? 'fill-current' : ''}`}
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
