'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserPreferences } from '@/types/user';
import { PremiumBadge } from '@/components/PremiumBadge';

type AttachmentMeta = {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
  path: string;
  url: string;
  owner?: string;
  createdAt: string;
};

type SettingsTab = 'profile' | 'interests' | 'subscription' | 'notifications';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [files, setFiles] = useState<AttachmentMeta[]>([]);
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const interestCategories = ['Environment', 'Science', 'Humanity', 'Technology', 'Health', 'Education', 'Animal Welfare', 'Invention'];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/user/preferences?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setPreferences(data.preferences || getDefaultPreferences(session.user.id)))
      .catch(() => setPreferences(getDefaultPreferences(session.user.id)));
    fetch(`/api/paperclip/list?owner=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch(() => setFiles([]));
  }, [session]);

  const getDefaultPreferences = (userId: string): UserPreferences => ({
    userId,
    theme: 'system',
    notifications: true,
    feedCategories: ['technology', 'science'],
    refreshInterval: 5,
  });

  const handleSave = async () => {
    if (!preferences || !session?.user?.id) return;

    setSaving(true);
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || !preferences) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading settings...</div>
      </div>
    );
  }

  const navItems: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'interests',
      label: 'Interests',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700 p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4 md:px-0">Settings</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8 md:space-y-12">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-8">Profile Details</h3>
              
              {/* Avatar and Basic Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-50 bg-[#2ecc71]/10 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                    {session?.user?.name || 'User'}
                    {session?.user?.isSubscribed && <PremiumBadge size="sm" />}
                  </h4>
                  <p className="text-gray-500">{session?.user?.email}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={session?.user?.name || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={session?.user?.email || ''}
                    disabled
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <button className="mt-8 px-6 py-2 bg-[#2ecc71] text-white rounded-lg font-bold hover:bg-[#27ae60] transition-colors">
                Save Changes
              </button>
            </section>
          )}

          {/* Interests Section */}
          {activeTab === 'interests' && (
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Content Interests</h3>
              <p className="text-gray-500 mb-8">Select the categories you&apos;d like to see more of in your daily feed.</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {interestCategories.map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 rounded-full border border-gray-200 hover:border-[#2ecc71] hover:text-[#2ecc71] transition-all font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button className="px-6 py-2 bg-[#2ecc71] text-white rounded-lg font-bold hover:bg-[#27ae60] transition-colors">
                Save Preferences
              </button>
            </section>
          )}

          {/* Subscription Section */}
          {activeTab === 'subscription' && (
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Subscription Status</h3>
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                    <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      {session?.user?.isSubscribed ? (
                        <>
                          Premium <PremiumBadge size="sm" />
                        </>
                      ) : (
                        'Free'
                      )}
                    </p>
                  </div>
                  <Link href="/subscription" className="px-4 py-2 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition">
                    {session?.user?.isSubscribed ? 'Manage' : 'Upgrade'}
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-8">Notification Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' | 'system' })}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent outline-none transition-all"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                      className="w-4 h-4 text-[#2ecc71] border-gray-300 rounded focus:ring-[#2ecc71]"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable notifications</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Refresh interval (minutes)</label>
                  <select
                    value={preferences.refreshInterval}
                    onChange={(e) => setPreferences({ ...preferences, refreshInterval: parseInt(e.target.value) })}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent outline-none transition-all"
                  >
                    <option value="1">1 minute</option>
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-[#2ecc71] text-white rounded-lg font-bold hover:bg-[#27ae60] transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                {saved && <span className="text-[#2ecc71] text-sm font-medium">Changes saved!</span>}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
