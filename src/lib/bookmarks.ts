import { NewsArticle } from './rss';

export interface Bookmark {
  id: string;
  userId: string;
  article: NewsArticle;
  sentiment: { score: number; isPositive: boolean; label: string; matchedKeywords: string[] };
  createdAt: string;
}

const bookmarks: Map<string, Bookmark[]> = new Map();

export function getUserBookmarks(userId: string): Bookmark[] {
  return bookmarks.get(userId) || [];
}

export function addBookmark(userId: string, article: NewsArticle, sentiment: { score: number; isPositive: boolean; label: string; matchedKeywords: string[] }): Bookmark {
  const userBookmarks = bookmarks.get(userId) || [];
  
  const exists = userBookmarks.some(b => b.article.link === article.link);
  if (exists) {
    throw new Error('Article already bookmarked');
  }
  
  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    userId,
    article,
    sentiment,
    createdAt: new Date().toISOString(),
  };
  
  userBookmarks.push(bookmark);
  bookmarks.set(userId, userBookmarks);
  
  return bookmark;
}

export function removeBookmark(userId: string, bookmarkId: string): boolean {
  const userBookmarks = bookmarks.get(userId) || [];
  const index = userBookmarks.findIndex(b => b.id === bookmarkId);
  
  if (index === -1) {
    return false;
  }
  
  userBookmarks.splice(index, 1);
  bookmarks.set(userId, userBookmarks);
  return true;
}

export function isBookmarked(userId: string, articleLink: string): boolean {
  const userBookmarks = bookmarks.get(userId) || [];
  return userBookmarks.some(b => b.article.link === articleLink);
}

export { bookmarks };
