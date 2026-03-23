const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    if (response.status === 204) {
      return { data: undefined };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

export interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  category?: string;
  sentiment?: {
    score: number;
    isPositive: boolean;
    label: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  isSubscribed: boolean;
}

export interface Bookmark {
  id: string;
  articleId: string;
  title: string;
  link: string;
  source: string;
  userId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Preferences {
  positiveOnly: boolean;
  sources: string[];
}

export interface ApiClient {
  feeds: {
    getAll: (filter?: 'positive') => Promise<ApiResponse<NewsArticle[]>>;
    getById: (id: string) => Promise<ApiResponse<NewsArticle>>;
  };
  auth: {
    register: (email: string, password: string, name?: string) => Promise<ApiResponse<User>>;
    login: (email: string, password: string) => Promise<ApiResponse<User>>;
    logout: () => Promise<ApiResponse<void>>;
    me: () => Promise<ApiResponse<User>>;
  };
  users: {
    getPreferences: () => Promise<ApiResponse<Preferences>>;
    updatePreferences: (prefs: Partial<Preferences>) => Promise<ApiResponse<Preferences>>;
  };
  subscriptions: {
    create: (priceId: string) => Promise<ApiResponse<{ subscriptionId: string }>>;
    cancel: () => Promise<ApiResponse<void>>;
  };
  bookmarks: {
    getAll: () => Promise<ApiResponse<Bookmark[]>>;
    add: (articleId: string, title: string, link: string, source?: string) => Promise<ApiResponse<Bookmark>>;
    remove: (id: string) => Promise<ApiResponse<void>>;
  };
  comments: {
    getByArticle: (articleId: string) => Promise<ApiResponse<Comment[]>>;
    getByUser: () => Promise<ApiResponse<Comment[]>>;
    add: (articleId: string, content: string) => Promise<ApiResponse<Comment>>;
    remove: (id: string) => Promise<ApiResponse<void>>;
  };
  paperclip: {
    upload: (file: File, owner?: string) => Promise<ApiResponse<{ id: string; filename: string; url: string }>>;
    list: (owner?: string) => Promise<ApiResponse<Array<{ id: string; filename: string; url: string; owner: string }>>>;
    get: (id: string) => Promise<ApiResponse<{ id: string; filename: string; url: string; owner: string }>>;
    delete: (id: string) => Promise<ApiResponse<void>>;
  };
}

export const api: ApiClient = {
  feeds: {
    getAll: async (filter) => {
      const endpoint = filter ? `/api/feeds?filter=${filter}` : '/api/feeds';
      return apiRequest<NewsArticle[]>(endpoint);
    },
    getById: async (id) => {
      return apiRequest<NewsArticle>(`/api/feeds/${id}`);
    },
  },
  auth: {
    register: async (email, password, name) => {
      return apiRequest<User>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
    },
    login: async (email, password) => {
      return apiRequest<User>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
    logout: async () => {
      return apiRequest<void>('/api/auth/logout', { method: 'POST' });
    },
    me: async () => {
      return apiRequest<User>('/api/users/me');
    },
  },
  users: {
    getPreferences: async () => {
      return apiRequest<Preferences>('/api/users/preferences');
    },
    updatePreferences: async (prefs) => {
      return apiRequest<Preferences>('/api/users/preferences', {
        method: 'PUT',
        body: JSON.stringify(prefs),
      });
    },
  },
  subscriptions: {
    create: async (priceId) => {
      return apiRequest<{ subscriptionId: string }>('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify({ priceId }),
      });
    },
    cancel: async () => {
      return apiRequest<void>('/api/subscriptions', { method: 'DELETE' });
    },
  },
  bookmarks: {
    getAll: async () => {
      return apiRequest<Bookmark[]>('/api/bookmarks');
    },
    add: async (articleId, title, link, source) => {
      return apiRequest<Bookmark>('/api/bookmarks/add', {
        method: 'POST',
        body: JSON.stringify({ articleId, title, link, source }),
      });
    },
    remove: async (id) => {
      return apiRequest<void>(`/api/bookmarks/remove?id=${id}`, {
        method: 'DELETE',
      });
    },
  },
  comments: {
    getByArticle: async (articleId) => {
      return apiRequest<Comment[]>(`/api/comments?articleId=${articleId}`);
    },
    getByUser: async () => {
      return apiRequest<Comment[]>('/api/comments/user');
    },
    add: async (articleId, content) => {
      return apiRequest<Comment>('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify({ articleId, content }),
      });
    },
    remove: async (id) => {
      return apiRequest<void>(`/api/comments/remove?id=${id}`, {
        method: 'DELETE',
      });
    },
  },
  paperclip: {
    upload: async (file, owner = '') => {
      const formData = new FormData();
      formData.append('file', file);
      if (owner) formData.append('owner', owner);

      const response = await fetch(`${API_BASE_URL}/api/paperclip/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { error: errorData.error || `HTTP ${response.status}` };
      }

      const data = await response.json();
      return { data };
    },
    list: async (owner) => {
      const endpoint = owner ? `/api/paperclip/list?owner=${owner}` : '/api/paperclip/list';
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        return { error: `HTTP ${response.status}` };
      }
      const data = await response.json();
      return { data };
    },
    get: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/paperclip/${id}`);
      if (!response.ok) {
        return { error: `HTTP ${response.status}` };
      }
      const data = await response.json();
      return { data };
    },
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/api/paperclip/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return { error: `HTTP ${response.status}` };
      }
      return { data: undefined };
    },
  },
};
