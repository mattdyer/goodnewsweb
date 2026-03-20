'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

interface ConsentConfig {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

export function updateConsent(consent: ConsentConfig) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', consent);
  }
}

export function defaultConsent() {
  updateConsent({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const consentData = JSON.parse(consent);
      updateConsent({
        analytics_storage: consentData.analytics ? 'granted' : 'denied',
        ad_storage: consentData.ads ? 'granted' : 'denied',
        ad_user_data: consentData.ads ? 'granted' : 'denied',
        ad_personalization: consentData.ads ? 'granted' : 'denied',
      });
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, analytics: true, ads: true })
    );
    updateConsent({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, analytics: false, ads: false })
    );
    defaultConsent();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, analytics: true, ads: false })
    );
    updateConsent({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Cookie Preferences
            </h2>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience, analyze site traffic, and personalize content.
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
              <a href="/privacy" className="text-green-600 hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
