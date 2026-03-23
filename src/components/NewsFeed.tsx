'use client';

import { useEffect, useState } from 'react';
import { NewsArticle, fetchAllFeeds } from '@/lib/rss';
import { analyzeSentiment } from '@/lib/sentiment';
import { useBookmarksContext } from '@/context/BookmarksContext';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import CommentSection from './CommentSection';

interface FilteredArticle extends NewsArticle {
  sentiment: { score: number; isPositive: boolean; label: string; matchedKeywords: string[] };
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<FilteredArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { bookmarks, addBookmark, removeBookmark, refetch } = useBookmarksContext();

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const rawArticles = await fetchAllFeeds();
        const articlesWithSentiment = rawArticles.map((article) => ({
          ...article,
          sentiment: article.sentiment 
            ? { ...article.sentiment, matchedKeywords: [] }
            : analyzeSentiment(`${article.title} ${article.description}`),
        }));
        const positiveArticles = articlesWithSentiment
          .filter((a) => a.sentiment.isPositive)
          .sort((a, b) => b.sentiment.score - a.sentiment.score);
        setArticles(positiveArticles.slice(0, 20));
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
    const interval = setInterval(loadNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const handleBookmarkAdded = (bookmark: any) => {
    addBookmark(bookmark.article, bookmark.sentiment);
  };

  const handleBookmarkRemoved = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-lg">Loading positive news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">Positive News Feed</h2>
        {lastUpdated && (
          <span className="text-sm text-gray-500">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="grid gap-4">
        {articles.map((article, index) => (
          <article
            key={`${article.link}-${index}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-medium text-green-600">{article.source}</span>
                  <span>{formatDate(article.pubDate)}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-green-600">
                  <span className="text-2xl">↑</span>
                  <span className="text-xs font-medium">+{article.sentiment.score}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <BookmarkButton
                    article={article}
                    sentiment={article.sentiment}
                    bookmarks={bookmarks}
                    onBookmarkAdded={handleBookmarkAdded}
                    onBookmarkRemoved={handleBookmarkRemoved}
                  />
                  <ShareButton url={article.link} title={article.title} />
                </div>
              </div>
            </div>
            <CommentSection articleLink={article.link} />
          </article>
        ))}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No positive news found at the moment. Check back soon!
        </div>
      )}
    </div>
  );
}
