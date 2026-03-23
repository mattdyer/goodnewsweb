'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly',
    features: [
      'Daily access to positive news',
      'Standard newsfeed',
    ],
    isPopular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    interval: 'monthly',
    features: [
      'Ad-free reading experience',
      'Exclusive "Supporter" badge',
      'Save unlimited articles',
      'Priority news alerts',
    ],
    isPopular: true,
  },
];

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/subscription');
    }
  }, [status, router]);

  const handleSubscribe = async (planId: string) => {
    if (!session?.user?.id) return;

    setProcessing(planId);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId: session.user.id, interval: billingPeriod }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to process subscription');
      } else {
        setSuccess(`Successfully subscribed!`);
        setTimeout(() => router.refresh(), 2000);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleCancel = async () => {
    if (!session?.user?.id) return;

    setProcessing('cancel');
    setError(null);

    try {
      const res = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to cancel subscription');
      } else {
        setSuccess('Subscription cancelled successfully');
        setTimeout(() => router.refresh(), 2000);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  const isSubscribed = session?.user?.isSubscribed;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700 p-2 -ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Subscription</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-20">
        {isSubscribed ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">You are a Premium Member</h2>
            <p className="text-gray-600 mb-8">Thank you for supporting Good News Everyone! Enjoy your ad-free experience and exclusive features.</p>
            <button
              onClick={handleCancel}
              disabled={processing === 'cancel'}
              className="px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50 font-medium"
            >
              {processing === 'cancel' ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Choose Your Experience
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Support independent positive journalism and unlock an even better reading experience.
              </p>
              
              <div className="mt-8 inline-flex items-center bg-white p-1 rounded-full border border-gray-200">
                <button 
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    billingPeriod === 'monthly' 
                      ? 'bg-[#2ecc71] text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    billingPeriod === 'yearly' 
                      ? 'bg-[#2ecc71] text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="max-w-2xl mx-auto mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Free</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Daily access to positive news</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Standard newsfeed</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <span>Ad-free experience</span>
                  </li>
                </ul>
                <button className="w-full py-4 px-6 border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Current Plan
                </button>
              </div>

              {/* Premium Tier */}
              <div className="bg-white rounded-3xl p-10 border-2 border-[#f1c40f] shadow-xl relative transition-transform hover:scale-[1.02]">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#f1c40f] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">
                    ${billingPeriod === 'monthly' ? '4.99' : '39.99'}
                  </span>
                  <span className="text-gray-400 font-medium">
                    /{billingPeriod === 'monthly' ? 'mo' : 'year'}
                  </span>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2ecc71] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-semibold">Ad-free reading experience</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2ecc71] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Exclusive &quot;Supporter&quot; badge</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2ecc71] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Save unlimited articles</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2ecc71] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Priority news alerts</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleSubscribe('premium')}
                  disabled={processing !== null}
                  className="w-full py-4 px-6 bg-[#2ecc71] text-white rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-[#27ae60] transition-all disabled:opacity-50"
                >
                  {processing === 'premium' ? 'Processing...' : 'Upgrade Now'}
                </button>
              </div>
            </div>

            <div className="mt-20 text-center text-gray-400 text-sm">
              Secure payments powered by Stripe. Cancel anytime.
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            <Link href="/privacy" className="hover:text-[#2ecc71] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#2ecc71] transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#2ecc71] transition">Contact Us</Link>
          </div>
          <div className="text-center text-gray-400 text-xs mt-2">
            v1.1.0
          </div>
        </div>
      </footer>
    </div>
  );
}
