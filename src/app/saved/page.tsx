'use client';

import { useBookmarksContext } from '@/context/BookmarksContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import { useEffect } from 'react';

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { bookmarks, loading, removeBookmark } = useBookmarksContext();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      await removeBookmark(bookmarkId);
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700">
                GoodNews
              </Link>
              <p className="text-gray-600">Your saved articles</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Feed
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Saved Articles</h1>
          <p className="text-gray-600 mt-1">
            {bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'} saved
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No saved articles yet</h3>
            <p className="mt-2 text-gray-500">
              Click the bookmark icon on any article to save it for later.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse News Feed
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((bookmark) => (
              <article
                key={bookmark.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        +{bookmark.sentiment.score}
                      </span>
                      <span className="text-xs text-gray-500">
                        Saved {formatDate(bookmark.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      <a
                        href={bookmark.article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        {bookmark.article.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {bookmark.article.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-medium text-green-600">{bookmark.article.source}</span>
                      <span>{formatDate(bookmark.article.pubDate)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove bookmark"
                      title="Remove bookmark"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                    <ShareButton
                      url={bookmark.article.link}
                      title={bookmark.article.title}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
