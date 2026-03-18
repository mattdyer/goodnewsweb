'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && !(event.target as Element).closest('.auth-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
    );
  }

  if (session) {
    return (
      <div className="relative auth-dropdown">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-medium">
            {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">{session.user?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
              {session.user?.isSubscribed && (
                <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Premium Member
                </span>
              )}
            </div>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setShowDropdown(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                setShowDropdown(false);
                signOut({ callbackUrl: '/' });
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
      >
        Get Started
      </Link>
    </div>
  );
}
