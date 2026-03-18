import { Subscription } from '@/types/user';
import { updateUserSubscription } from './users';

const subscriptions: Map<string, Subscription> = new Map();

export function createSubscription(userId: string, plan: 'monthly' | 'yearly'): Subscription {
  const subscription: Subscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    plan,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + (plan === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
  };

  subscriptions.set(userId, subscription);
  updateUserSubscription(userId, true);

  return subscription;
}

export function cancelSubscription(userId: string): boolean {
  const subscription = subscriptions.get(userId);
  if (subscription) {
    subscription.status = 'cancelled';
    updateUserSubscription(userId, false);
    return true;
  }
  return false;
}

export function getSubscription(userId: string): Subscription | null {
  return subscriptions.get(userId) || null;
}

export function isSubscriptionActive(userId: string): boolean {
  const subscription = subscriptions.get(userId);
  if (!subscription) return false;
  
  if (subscription.status !== 'active') return false;
  
  const now = new Date();
  return now < subscription.endDate;
}
