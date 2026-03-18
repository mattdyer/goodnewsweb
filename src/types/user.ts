export interface User {
  id: string;
  email: string;
  name?: string | null;
  isSubscribed: boolean;
  createdAt: Date;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  feedCategories: string[];
  refreshInterval: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
}
