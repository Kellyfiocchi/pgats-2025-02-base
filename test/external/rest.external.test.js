const request = require('supertest');
const { expect } = require('chai');

const REST_BASE_URL = process.env.REST_BASE_URL || 'http://localhost:3000';

describe('External REST /health', () => {
  it('200 ok', async () => {
    const { body } = await request(REST_BASE_URL).get('/health').expect(200);
    expect(body.ok).to.equal(true);
  });
});
