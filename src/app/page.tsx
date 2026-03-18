import NewsFeed from '@/components/NewsFeed';
import AuthButton from '@/components/AuthButton';
import AdBanner from '@/components/AdBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-600">GoodNews</h1>
            <p className="text-gray-600">Uplifting stories from around the world</p>
          </div>
          <AuthButton />
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdBanner />
        <NewsFeed />
      </div>
      
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          GoodNews Aggregator • Bringing you positive stories
        </div>
      </footer>
    </main>
  );
}
