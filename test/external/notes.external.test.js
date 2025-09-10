const request = require('supertest');
const { expect } = require('chai');

const REST = process.env.REST_BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.API_KEY || 'dev123';

describe('External /api/notes', () => {
  it('cria e lista nota com x-api-key', async () => {
    const created = await request(REST)
      .post('/api/notes')
      .set('x-api-key', API_KEY)
      .send({ title: 'nota', content: 'oi' })
      .expect(201);
    expect(created.body).to.have.property('id');

    const list = await request(REST)
      .get('/api/notes')
      .set('x-api-key', API_KEY)
      .expect(200);
    expect(list.body.length).to.be.greaterThan(0);
  });
});
