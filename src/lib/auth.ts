import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      isSubscribed: boolean;
    };
    serverToken?: string;
  }
  interface User {
    id: string;
    email: string;
    name?: string | null;
    isSubscribed: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isSubscribed: boolean;
    serverToken?: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const result = await response.json();
          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            isSubscribed: result.user.isSubscribed,
            serverToken: result.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isSubscribed = user.isSubscribed;
        token.serverToken = (user as any).serverToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.isSubscribed = token.isSubscribed;
        (session as any).serverToken = token.serverToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-for-local-testing-only',
};

export async function getSession() {
  return getServerSession(authOptions);
}
