'use client';

import Script from 'next/script';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdSenseProps {
  adClient: string;
}

export default function GoogleAdSense({ adClient }: GoogleAdSenseProps) {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      onLoad={() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }}
    />
  );
}
