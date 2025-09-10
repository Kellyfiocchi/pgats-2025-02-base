const request = require('supertest');
const { expect } = require('chai');
const app = require('../../graphql/app');

describe('GraphQL health (controller)', () => {
  it('health { ok service }', async () => {
    const query = { query: 'query { health { ok service } }' };
    const res = await request(app).post('/graphql').send(query).expect(200);
    expect(res.body.data.health.ok).to.equal(true);
  });
});
