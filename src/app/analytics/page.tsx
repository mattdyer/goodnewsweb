'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchAllFeeds, NewsArticle } from '@/lib/rss';
import { analyzeSentiment } from '@/lib/sentiment';
import { useBookmarksContext } from '@/context/BookmarksContext';
import { useCommentsContext } from '@/context/CommentsContext';
import Link from 'next/link';

interface ArticleWithSentiment extends NewsArticle {
  sentiment: { score: number; matchedKeywords: string[] };
}

interface SourceStats {
  name: string;
  count: number;
  avgSentiment: number;
}

export default function AnalyticsPage() {
  const [articles, setArticles] = useState<ArticleWithSentiment[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks } = useBookmarksContext();
  const { articleComments } = useCommentsContext();

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        const rawArticles = await fetchAllFeeds();
        const articlesWithSentiment = rawArticles.map((article) => ({
          ...article,
          sentiment: analyzeSentiment(`${article.title} ${article.description}`),
        }));
        setArticles(articlesWithSentiment);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  const trendingArticles = useMemo(() => {
    return [...articles]
      .filter((a) => a.sentiment.score > 0)
      .sort((a, b) => b.sentiment.score - a.sentiment.score)
      .slice(0, 5);
  }, [articles]);

  const sourceStats = useMemo(() => {
    const statsMap = new Map<string, { count: number; totalScore: number }>();
    
    articles.forEach((article) => {
      const existing = statsMap.get(article.source) || { count: 0, totalScore: 0 };
      statsMap.set(article.source, {
        count: existing.count + 1,
        totalScore: existing.totalScore + article.sentiment.score,
      });
    });

    const stats: SourceStats[] = [];
    statsMap.forEach((value, name) => {
      stats.push({
        name,
        count: value.count,
        avgSentiment: value.totalScore / value.count,
      });
    });

    return stats.sort((a, b) => b.avgSentiment - a.avgSentiment);
  }, [articles]);

  const topSources = sourceStats.slice(0, 5);

  const userEngagement = useMemo(() => {
    const totalBookmarks = bookmarks.length;
    const totalComments = Array.from(articleComments.values()).reduce(
      (sum, comments) => sum + comments.length,
      0
    );
    const bookmarkedArticleLinks = new Set(bookmarks.map((b) => b.article.link));
    const commentedArticles = new Set(
      Array.from(articleComments.entries())
        .filter(([, comments]) => comments.length > 0)
        .map(([link]) => link)
    );

    return {
      totalBookmarks,
      totalComments,
      engagedArticles: bookmarkedArticleLinks.size + commentedArticles.size,
    };
  }, [bookmarks, articleComments]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700">
                GoodNews
              </Link>
              <p className="text-gray-600">Analytics Dashboard</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Feed
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Bookmarks</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{userEngagement.totalBookmarks}</p>
            <p className="text-sm text-gray-500">Articles saved</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{userEngagement.totalComments}</p>
            <p className="text-sm text-gray-500">Comments posted</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Sources</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{sourceStats.length}</p>
            <p className="text-sm text-gray-500">Active news feeds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Trending Positive Stories</h2>
              <p className="text-sm text-gray-500">Top stories by sentiment score</p>
            </div>
            <div className="divide-y divide-gray-100">
              {trendingArticles.map((article, index) => (
                <div key={`${article.link}-${index}`} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          #{index + 1}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(article.pubDate)}</span>
                      </div>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-medium hover:text-green-600 transition-colors line-clamp-2"
                      >
                        {article.title}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">{article.source}</p>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <span className="text-2xl text-green-600">+{article.sentiment.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Top Sources</h2>
              <p className="text-sm text-gray-500">By average positive sentiment</p>
            </div>
            <div className="px-6 py-4">
              {topSources.map((source, index) => (
                <div key={source.name} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{source.name}</p>
                    <p className="text-xs text-gray-500">{source.count} articles</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-lg font-semibold text-green-600">
                      +{source.avgSentiment.toFixed(1)}
                    </span>
                    <p className="text-xs text-gray-400">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Feed Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              <p className="text-sm text-gray-500">Total Articles</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {articles.filter((a) => a.sentiment.score > 0).length}
              </p>
              <p className="text-sm text-green-600">Positive Stories</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {sourceStats.length}
              </p>
              <p className="text-sm text-yellow-600">News Sources</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {sourceStats.length > 0
                  ? (articles.reduce((sum, a) => sum + a.sentiment.score, 0) / articles.length).toFixed(1)
                  : 0}
              </p>
              <p className="text-sm text-blue-600">Avg Sentiment</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
