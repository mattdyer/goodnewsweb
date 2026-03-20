import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AuthProvider from "@/components/AuthProvider";
import { CommentsProvider } from "@/context/CommentsContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import GoogleAdSense from "@/components/GoogleAdSense";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import GoogleAnalytics, { TrackPageViews } from "@/components/GoogleAnalytics";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good News Everyone - News Aggregator",
  description: "Your personalized news aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID && (
          <GoogleAdSense adClient={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID} />
        )}
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <AuthProvider>
          <BookmarksProvider>
            <CommentsProvider>
              <Suspense fallback={null}>
                <TrackPageViews />
              </Suspense>
              {children}
              <ConsentBanner />
            </CommentsProvider>
          </BookmarksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
