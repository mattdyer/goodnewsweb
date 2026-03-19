const PAPERCLIP_URL = process.env.PAPERCLIP_URL || 'http://localhost:3001';

function uploadFile(filename, content, contentType, owner = '') {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  let parts = [
    `--${boundary}`,
    `Content-Disposition: form-data; name="file"; filename="${filename}"`,
    `Content-Type: ${contentType}`,
    '',
    content,
  ];
  
  if (owner) {
    parts.push(`--${boundary}`);
    parts.push('Content-Disposition: form-data; name="owner"');
    parts.push('');
    parts.push(owner);
  }
  
  parts.push(`--${boundary}--`);
  const body = parts.join('\r\n');

  return fetch(`${PAPERCLIP_URL}/api/paperclip/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
    body,
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (e) {
      console.log(`✗ ${name}`);
      console.log(`  Error: ${e.message}`);
      failed++;
    }
  }

  function expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
      },
      toHaveProperty: (key, value) => {
        if (!(key in actual)) throw new Error(`Expected property ${key}`);
        if (value !== undefined && actual[key] !== value) throw new Error(`Expected ${key}=${value}, got ${actual[key]}`);
      },
    };
  }

  // Test 1: Upload file
  await test('POST /api/paperclip/upload - uploads a file successfully', async () => {
    const response = await uploadFile('test.txt', 'Hello, this is a test file for Paperclip!', 'text/plain', 'test-user');
    if (!response.ok) throw new Error(`Status ${response.status}`);
    if (response.status !== 201) throw new Error(`Expected 201, got ${response.status}`);
    const data = await response.json();
    if (!('id' in data)) throw new Error('Missing id property');
    if (data.filename !== 'test.txt') throw new Error(`Expected filename test.txt, got ${data.filename}`);
  });

  // Test 2: Reject without file
  await test('POST /api/paperclip/upload - rejects file without file part', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/upload`, { method: 'POST' });
    if (response.status !== 400) throw new Error(`Expected 400, got ${response.status}`);
    const data = await response.json();
    if (!('error' in data)) throw new Error('Missing error property');
  });

  // Test 3: List files
  await test('GET /api/paperclip/list - returns list of attachments', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/list`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Expected array');
  });

  // Test 4: List files by owner
  await test('GET /api/paperclip/list?owner - filters by owner', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/list?owner=test-user`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Expected array');
  });

  // Test 5: Get file by id
  await test('GET /api/paperclip/:id - returns attachment metadata', async () => {
    const uploadResponse = await uploadFile('get-test.txt', 'Test file for get', 'text/plain');
    const uploadData = await uploadResponse.json();
    const getResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`);
    if (!getResponse.ok) throw new Error(`Status ${getResponse.status}`);
    const data = await getResponse.json();
    if (data.id !== uploadData.id) throw new Error(`Expected id ${uploadData.id}, got ${data.id}`);
    if (data.filename !== 'get-test.txt') throw new Error(`Expected filename get-test.txt, got ${data.filename}`);
  });

  // Test 6: 404 for non-existent
  await test('GET /api/paperclip/:id - returns 404 for non-existent id', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`);
    if (response.status !== 404) throw new Error(`Expected 404, got ${response.status}`);
  });

  // Test 7: Delete file
  await test('DELETE /api/paperclip/:id - deletes an attachment', async () => {
    const uploadResponse = await uploadFile('delete-me.txt', 'File to be deleted', 'text/plain');
    const uploadData = await uploadResponse.json();
    const deleteResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`, { method: 'DELETE' });
    if (!deleteResponse.ok) throw new Error(`Status ${deleteResponse.status}`);
    if (deleteResponse.status !== 204) throw new Error(`Expected 204, got ${deleteResponse.status}`);
    const getResponse = await fetch(`${PAPERCLIP_URL}/api/paperclip/${uploadData.id}`);
    if (getResponse.status !== 404) throw new Error(`Expected 404, got ${getResponse.status}`);
  });

  // Test 8: Delete non-existent
  await test('DELETE /api/paperclip/:id - returns 404 for non-existent id', async () => {
    const response = await fetch(`${PAPERCLIP_URL}/api/paperclip/non-existent-id`, { method: 'DELETE' });
    if (response.status !== 404) throw new Error(`Expected 404, got ${response.status}`);
  });

  console.log();
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});