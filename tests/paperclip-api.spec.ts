import { test, expect } from '@playwright/test';

const PAPERCLIP_URL = process.env.PAPERCLIP_URL || 'http://localhost:3001';

test.describe('Paperclip API', () => {
  let testFileId: string;

  test('POST /api/paperclip/upload - uploads a file successfully', async ({ page }) => {
    const response = await page.evaluate(async (url) => {
      const formData = new FormData();
      const blob = new Blob(['Hello, this is a test file for Paperclip!'], { type: 'text/plain' });
      formData.append('file', blob, 'test.txt');
      formData.append('owner', 'test-user');
      
      const res = await fetch(`${url}/api/paperclip/upload`, {
        method: 'POST',
        body: formData,
      });
      
      return {
        status: res.status,
        body: await res.json()
      };
    }, PAPERCLIP_URL);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.filename).toBe('test.txt');
    expect(response.body).toHaveProperty('url');
    expect(response.body.size).toBe(40);

    testFileId = response.body.id;
  });

  test('POST /api/paperclip/upload - rejects file without file part', async ({ page }) => {
    const response = await page.evaluate(async (url) => {
      const res = await fetch(`${url}/api/paperclip/upload`, {
        method: 'POST',
        body: {},
      });
      
      return {
        status: res.status,
        body: await res.json()
      };
    }, PAPERCLIP_URL);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('GET /api/paperclip/list - returns list of attachments', async ({ request }) => {
    const response = await request.get(`${PAPERCLIP_URL}/api/paperclip/list`);
    
    expect(response.ok()).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/paperclip/list?owner - filters by owner', async ({ request }) => {
    const response = await request.get(`${PAPERCLIP_URL}/api/paperclip/list?owner=test-user`);
    
    expect(response.ok()).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/paperclip/:id - returns attachment metadata', async ({ page }) => {
    const result = await page.evaluate(async (url) => {
      const formData = new FormData();
      const blob = new Blob(['Test file for get'], { type: 'text/plain' });
      formData.append('file', blob, 'get-test.txt');
      
      const uploadRes = await fetch(`${url}/api/paperclip/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      const getRes = await fetch(`${url}/api/paperclip/${uploadData.id}`);
      return {
        status: getRes.status,
        body: await getRes.json()
      };
    }, PAPERCLIP_URL);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body.filename).toBe('get-test.txt');
  });

  test('GET /api/paperclip/:id - returns 404 for non-existent id', async ({ request }) => {
    const response = await request.get(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`);
    
    expect(response.status()).toBe(404);
  });

  test('DELETE /api/paperclip/:id - deletes an attachment', async ({ page }) => {
    const result = await page.evaluate(async (url) => {
      const formData = new FormData();
      const blob = new Blob(['File to be deleted'], { type: 'text/plain' });
      formData.append('file', blob, 'delete-me.txt');
      
      const uploadRes = await fetch(`${url}/api/paperclip/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      const deleteRes = await fetch(`${url}/api/paperclip/${uploadData.id}`, {
        method: 'DELETE',
      });

      const getRes = await fetch(`${url}/api/paperclip/${uploadData.id}`);
      return {
        deleteStatus: deleteRes.status,
        getStatus: getRes.status
      };
    }, PAPERCLIP_URL);

    expect(result.deleteStatus).toBe(204);
    expect(result.getStatus).toBe(404);
  });

  test('DELETE /api/paperclip/:id - returns 404 for non-existent id', async ({ request }) => {
    const response = await request.delete(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`);
    
    expect(response.status()).toBe(404);
  });
});