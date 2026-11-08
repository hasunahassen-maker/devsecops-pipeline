const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./index');

test('GET /health returns status ok', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
 assert.deepEqual(response.body, { status: 'ok' });
});

test('GET /items returns the expected items', async () => {
  const response = await request(app).get('/items');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, [
    { id: 1, name: 'Notebook' },
    { id: 2, name: 'Pen' }
  ]);
});

test('An unknown route returns 404', async () => {
  const response = await request(app).get('/missing');

  assert.equal(response.status, 404);
});

test('GET /greet returns a greeting for the supplied name', async () => {
  const response = await request(app).get('/greet?name=Sam');

  assert.equal(response.status, 200);
  assert.equal(response.text, 'Hello Broken');
});