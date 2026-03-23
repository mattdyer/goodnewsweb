'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useBookmarksContext } from '@/context/BookmarksContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { bookmarks } = useBookmarksContext();

  // Don't show on login/signup pages
  if (pathname === '/login' || pathname === '/signup') return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('/') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>

        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors relative ${
            isActive('/saved') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
          }`}
        >
          <svg className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${bookmarks.length > 0 && isActive('/saved') ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Saved</span>
          {bookmarks.length > 0 && (
            <span className="absolute top-2 right-[30%] bg-green-600 text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('/settings') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
