'use client';

import Script from 'next/script';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

export function trackPageView(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_location: url,
    });
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackSignup(method: string) {
  trackEvent('sign_up', 'engagement', method);
}

export function trackSubscription(priceId: string, value?: number) {
  trackEvent('purchase', 'ecommerce', priceId, value);
}

export function trackBookmark(action: 'add' | 'remove') {
  trackEvent(action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist', 'engagement', 'bookmark');
}

export function trackLogin(method: string) {
  trackEvent('login', 'engagement', method);
}

function TrackPageViewsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export function TrackPageViews() {
  return (
    <Suspense fallback={null}>
      <TrackPageViewsInner />
    </Suspense>
  );
}
