import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import { CommentsProvider } from "@/context/CommentsContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import GoogleAdSense from "@/components/GoogleAdSense";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoodNews - News Aggregator",
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
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID && (
          <GoogleAdSense adClient={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID} />
        )}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <BookmarksProvider>
            <CommentsProvider>{children}</CommentsProvider>
          </BookmarksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
