const API_BASE = process.env.API_BASE || 'http://localhost:3001';

describe('Server API', () => {
  let authToken: string;
  let userId: string;

  describe('Auth', () => {
    let testEmail: string;

    test('POST /api/auth/register - creates new user', async () => {
      testEmail = `test-${Date.now()}@example.com`;
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'testpass123',
          name: 'Test User',
        }),
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
      expect(data).toHaveProperty('name');
      userId = data.id;
    });

    test('POST /api/auth/login - authenticates user', async () => {
      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'testpass123',
        }),
      });

      expect(loginResponse.ok).toBe(true);
      const result = await loginResponse.json();
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      authToken = result.token;
    });

    test('POST /api/auth/login - authenticates user', async () => {
      const loginTestEmail = `login-test-${Date.now()}@example.com`;
      const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginTestEmail,
          password: 'testpass123',
          name: 'Login Test',
        }),
      });
      await registerResponse.json();

      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginTestEmail,
          password: 'testpass123',
        }),
      });

      expect(loginResponse.ok).toBe(true);
      const result = await loginResponse.json();
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      authToken = result.token;
    });

    test('POST /api/auth/login - rejects invalid credentials', async () => {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        }),
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('POST /api/auth/logout - invalidates token', async () => {
      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.status).toBe(204);
    });
  });

  describe('Feeds', () => {
    test('GET /api/feeds - returns news articles', async () => {
      jest.setTimeout(15000);
      const response = await fetch(`${API_BASE}/api/feeds`);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('title');
        expect(data[0]).toHaveProperty('link');
      }
    });

    test('GET /api/feeds?filter=positive - filters positive news', async () => {
      jest.setTimeout(15000);
      const response = await fetch(`${API_BASE}/api/feeds?filter=positive`);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('GET /api/feeds/sources - returns RSS sources', async () => {
      const response = await fetch(`${API_BASE}/api/feeds/sources`);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('Users (authenticated)', () => {
    let userEmail: string;

    beforeAll(async () => {
      userEmail = `user-test-${Date.now()}@example.com`;
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: 'testpass123',
          name: 'User Test',
        }),
      });
      const user = await response.json();

      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: 'testpass123',
        }),
      });
      const result = await loginResponse.json();
      authToken = result.token;
      userId = user.id;
    });

    test('GET /api/users/me - returns current user', async () => {
      const response = await fetch(`${API_BASE}/api/users/me`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
      expect(data).not.toHaveProperty('password');
    });

    test('GET /api/users/me - rejects unauthenticated', async () => {
      const response = await fetch(`${API_BASE}/api/users/me`);

      expect(response.status).toBe(401);
    });

    test('GET /api/users/preferences - returns user preferences', async () => {
      const response = await fetch(`${API_BASE}/api/users/preferences`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toHaveProperty('userId');
    });

    test('PUT /api/users/preferences - updates preferences', async () => {
      const response = await fetch(`${API_BASE}/api/users/preferences`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: 'dark', notifications: true }),
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data.theme).toBe('dark');
      expect(data.notifications).toBe(true);
    });
  });

  describe('Bookmarks (authenticated)', () => {
    let bookmarkEmail: string;

    beforeAll(async () => {
      bookmarkEmail = `bookmark-test-${Date.now()}@example.com`;
      const regResponse = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: bookmarkEmail,
          password: 'testpass123',
          name: 'Bookmark Test',
        }),
      });
      await regResponse.json();

      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: bookmarkEmail,
          password: 'testpass123',
        }),
      });
      const result = await loginResponse.json();
      authToken = result.token;
    });

    test('GET /api/bookmarks - returns user bookmarks', async () => {
      const response = await fetch(`${API_BASE}/api/bookmarks`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('POST /api/bookmarks - creates bookmark', async () => {
      const response = await fetch(`${API_BASE}/api/bookmarks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: 'test-article-1',
          title: 'Test Article',
          link: 'https://example.com/article',
          source: 'Test',
        }),
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data.articleId).toBe('test-article-1');
    });

    test('DELETE /api/bookmarks/:id - removes bookmark', async () => {
      const createResponse = await fetch(`${API_BASE}/api/bookmarks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: 'test-article-2',
          title: 'Test Article 2',
          link: 'https://example.com/article2',
          source: 'Test',
        }),
      });
      const bookmark = await createResponse.json();

      const deleteResponse = await fetch(`${API_BASE}/api/bookmarks/${bookmark.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(deleteResponse.status).toBe(204);
    });

    test('DELETE /api/bookmarks/:id - returns 404 for non-existent', async () => {
      const response = await fetch(`${API_BASE}/api/bookmarks/non-existent-id`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.status).toBe(404);
    });
  });

  describe('Comments', () => {
    let commentEmail: string;

    beforeAll(async () => {
      commentEmail = `comment-test-${Date.now()}@example.com`;
      const regResponse = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: commentEmail,
          password: 'testpass123',
          name: 'Comment Test',
        }),
      });
      await regResponse.json();

      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: commentEmail,
          password: 'testpass123',
        }),
      });
      const result = await loginResponse.json();
      authToken = result.token;
    });

    test('GET /api/comments - returns all comments', async () => {
      const response = await fetch(`${API_BASE}/api/comments`);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('GET /api/comments?articleId - filters by article', async () => {
      const response = await fetch(`${API_BASE}/api/comments?articleId=nonexistent`);

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('POST /api/comments - creates comment (authenticated)', async () => {
      const response = await fetch(`${API_BASE}/api/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: 'test-article-1',
          content: 'Test comment',
        }),
      });

      expect(response.ok).toBe(true);
      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data.content).toBe('Test comment');
    });

    test('DELETE /api/comments/:id - removes comment', async () => {
      const createResponse = await fetch(`${API_BASE}/api/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: 'test-article-3',
          content: 'Comment to delete',
        }),
      });
      const comment = await createResponse.json();

      const deleteResponse = await fetch(`${API_BASE}/api/comments/${comment.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(deleteResponse.status).toBe(204);
    });
  });
});
