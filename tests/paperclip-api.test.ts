const PAPERCLIP_URL = process.env.PAPERCLIP_URL || 'http://localhost:3001';

function uploadFile(filename: string, content: string, contentType: string, owner = '') {
  const formData = new FormData();
  const blob = new Blob([content], { type: contentType });
  formData.append('file', blob, filename);
  if (owner) {
    formData.append('owner', owner);
  }

  return fetch(`${PAPERCLIP_URL}/api/paperclip/upload`, {
    method: 'POST',
    body: formData,
  });
}

describe('Paperclip API', () => {
  let testFileId: string;

  test('POST /api/paperclip/upload - uploads a file successfully', async () => {
    const response = await uploadFile('test.txt', 'Hello, this is a test file for Paperclip!', 'text/plain', 'test-user');
    
    expect(response.ok).toBe(true);
    expect(response.status).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.filename).toBe('test.txt');
    expect(data).toHaveProperty('url');
    expect(data).toHaveProperty('size');

    testFileId = data.id;
  });

  test('POST /api/paperclip/upload - rejects file without file part', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/upload`, {
      method: 'POST',
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('GET /api/paperclip/list - returns list of attachments', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/list`);
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/paperclip/list?owner - filters by owner', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/list?owner=test-user`);
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('GET /api/paperclip/:id - returns attachment metadata', async () => {
    const uploadResponse = await uploadFile('get-test.txt', 'Test file for get', 'text/plain');
    const uploadData = await uploadResponse.json();

    const getResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`);
    
    expect(getResponse.ok).toBe(true);
    const data = await getResponse.json();
    expect(data.id).toBe(uploadData.id);
    expect(data.filename).toBe('get-test.txt');
  });

  test('GET /api/paperclip/:id - returns 404 for non-existent id', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`);
    
    expect(response.status).toBe(404);
  });

  test('DELETE /api/paperclip/:id - deletes an attachment', async () => {
    const uploadResponse = await uploadFile('delete-me.txt', 'File to be deleted', 'text/plain');
    const uploadData = await uploadResponse.json();

    const deleteResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`, {
      method: 'DELETE',
    });
    
    expect(deleteResponse.ok).toBe(true);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`);
    expect(getResponse.status).toBe(404);
  });

  test('DELETE /api/paperclip/:id - returns 404 for non-existent id', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`, {
      method: 'DELETE',
    });
    
    expect(response.status).toBe(404);
  });
});