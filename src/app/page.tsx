'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import NewsFeed from '@/components/NewsFeed';
import AuthButton from '@/components/AuthButton';
import AdBanner from '@/components/AdBanner';
import { useBookmarksContext } from '@/context/BookmarksContext';

function SavedLink() {
  const { data: session } = useSession();
  const { bookmarks } = useBookmarksContext();

  if (!session) return null;

  return (
    <Link
      href="/saved"
      className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors"
    >
      <svg
        className={`w-4 h-4 ${bookmarks.length > 0 ? 'fill-current text-yellow-500' : ''}`}
        fill={bookmarks.length > 0 ? 'currentColor' : 'none'}
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
      Saved
      {bookmarks.length > 0 && (
        <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {bookmarks.length}
        </span>
      )}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-green-600 truncate">Good News Everyone</h1>
            <p className="text-gray-600 hidden sm:block">Uplifting stories from around the world</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <SavedLink />
            </div>
            <AuthButton />
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdBanner />
        <NewsFeed />
      </div>
      
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            <Link href="/privacy" className="hover:text-green-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-600">Terms of Service</Link>
            <Link href="/contact" className="hover:text-green-600">Contact Us</Link>
          </div>
          <div className="text-center text-gray-500 text-sm">
            Good News Everyone Aggregator • Bringing you positive stories
          </div>
          <div className="text-center text-gray-400 text-xs mt-2">
            v1.1.0
          </div>
        </div>
      </footer>
    </main>
  );
}
