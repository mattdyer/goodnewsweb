'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface AdBannerProps {
  adSlot?: string;
  adFormat?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  adSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT || '',
  adFormat = 'auto',
  style = {},
}: AdBannerProps) {
  const { data: session } = useSession();
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (session?.user?.isSubscribed) {
      return;
    }

    if (!adSlot || !process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
      return;
    }

    const pushAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    if (adRef.current) {
      const timer = setTimeout(pushAd, 100);
      return () => clearTimeout(timer);
    }
  }, [session, adSlot]);

  if (session?.user?.isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-green-800">
            Ad-free experience active (Premium)
          </span>
        </div>
      </div>
    );
  }

  if (!adSlot || !process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              Enjoying GoodNews?
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Support us and get an ad-free experience with Premium
            </p>
          </div>
          <a
            href="/subscription"
            className="flex-shrink-0 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition"
          >
            Go Premium
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
