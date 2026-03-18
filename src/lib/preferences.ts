import { UserPreferences } from '@/types/user';

const preferencesStore: Map<string, UserPreferences> = new Map();

export function getPreferences(userId: string): UserPreferences | null {
  return preferencesStore.get(userId) || null;
}

export function savePreferences(preferences: UserPreferences): UserPreferences {
  preferencesStore.set(preferences.userId, preferences);
  return preferences;
}

export function deletePreferences(userId: string): boolean {
  return preferencesStore.delete(userId);
}
