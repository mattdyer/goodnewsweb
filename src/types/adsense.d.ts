interface Window {
  adsbygoogle: unknown[];
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID?: string;
    NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT?: string;
  }
}
