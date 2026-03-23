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
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 4.99,
    interval: 'monthly',
    features: [
      'Ad-free experience',
      'Unlimited article saves',
      'Custom news categories',
      'Priority support',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 39.99,
    interval: 'yearly',
    features: [
      'All Monthly features',
      'Save $20 per year',
      'Early access to new features',
      'Exclusive monthly newsletter',
    ],
  },
];

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ planId, userId: session.user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to process subscription');
      } else {
        setSuccess(`Successfully subscribed to ${planId} plan!`);
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {isSubscribed ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You are a Premium Member</h2>
            <p className="text-gray-600 mb-6">Thank you for supporting Good News Everyone!</p>
            <p className="text-gray-600 mb-6">Enjoy your ad-free experience.</p>
            <button
              onClick={handleCancel}
              disabled={processing === 'cancel'}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              {processing === 'cancel' ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upgrade to Premium</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Remove ads and unlock all features for a better news experience.
              </p>
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

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-md p-8 ${
                    plan.id === 'yearly' ? 'border-2 border-green-500 relative' : ''
                  }`}
                >
                  {plan.id === 'yearly' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Best Value
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/{plan.interval === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={processing !== null}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                      plan.id === 'yearly'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } disabled:opacity-50`}
                  >
                    {processing === plan.id ? 'Processing...' : `Subscribe ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Secure payment powered by Stripe. Cancel anytime.
            </p>
          </>
        )}
      </div>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
            <Link href="/privacy" className="hover:text-green-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-600">Terms of Service</Link>
            <Link href="/contact" className="hover:text-green-600">Contact Us</Link>
          </div>
          <div className="text-center text-gray-400 text-xs mt-2">
            v1.1.0
          </div>
        </div>
      </footer>
    </div>
  );
}
