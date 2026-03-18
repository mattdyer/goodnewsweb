import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { User } from '@/types/user';

const users: Map<string, User & { passwordHash: string }> = new Map();

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  const hashVerify = createHash('sha256').update(password + salt).digest('hex');
  return Promise.resolve(timingSafeEqual(Buffer.from(hash), Buffer.from(hashVerify)));
}

export function createUser(email: string, password: string, name?: string): User {
  const existingUser = users.get(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user: User & { passwordHash: string } = {
    id: randomBytes(16).toString('hex'),
    email,
    name: name || null,
    passwordHash: hashPassword(password),
    isSubscribed: false,
    createdAt: new Date(),
  };

  users.set(email, user);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isSubscribed: user.isSubscribed,
    createdAt: user.createdAt,
  };
}

export function getUserByEmail(email: string): User | null {
  const user = users.get(email);
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isSubscribed: user.isSubscribed,
    createdAt: user.createdAt,
  };
}

export function getUserById(id: string): User | null {
  for (const user of users.values()) {
    if (user.id === id) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        isSubscribed: user.isSubscribed,
        createdAt: user.createdAt,
      };
    }
  }
  return null;
}

export function updateUserSubscription(userId: string, isSubscribed: boolean): boolean {
  for (const user of users.values()) {
    if (user.id === userId) {
      user.isSubscribed = isSubscribed;
      return true;
    }
  }
  return false;
}

export { users };
