const request = require('supertest');
const { expect } = require('chai');
const app = require('../../rest/app');

describe('REST /health (controller)', () => {
  it('retorna ok:true', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body).to.have.property('ok', true);
  });
});
