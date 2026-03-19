import Parser from 'rss-parser';
import { api, NewsArticle } from './api';

export type { NewsArticle };

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'content:encoded'],
  },
});

const RSS_FEEDS = [
  { name: 'BBC Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml' },
  { name: 'BBC Science', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
  { name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml' },
  { name: 'NYT Technology', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'Wired Science', url: 'https://www.wired.com/feed/category/science/latest/rss' },
  { name: 'Al Jazeera Science', url: 'https://www.aljazeera.com/science-and-technology/rss' },
];

export const RSS_SOURCES = RSS_FEEDS.map(f => f.name);

async function fetchFromServer(filter?: 'positive'): Promise<NewsArticle[] | null> {
  try {
    const result = await api.feeds.getAll(filter);
    if (result.data && !result.error) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchDirectly(filter?: 'positive'): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  const fetchPromises = RSS_FEEDS.map(async (feed) => {
    try {
      const feedData = await parser.parseURL(feed.url);
      const feedArticles = (feedData.items || []).map((item) => ({
        title: item.title || '',
        link: item.link || item.guid || '',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        description: item.contentSnippet || item.content || item.summary || '',
        source: feed.name,
        category: feedData.title || '',
      }));
      articles.push(...feedArticles);
    } catch (error) {
      console.error(`Error fetching feed ${feed.name}:`, error);
    }
  });

  await Promise.all(fetchPromises);

  return articles.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });
}

export async function fetchAllFeeds(filter?: 'positive'): Promise<NewsArticle[]> {
  const serverArticles = await fetchFromServer(filter);
  if (serverArticles) {
    return serverArticles;
  }
  
  console.log('Server unavailable, fetching RSS directly');
  return fetchDirectly(filter);
}
