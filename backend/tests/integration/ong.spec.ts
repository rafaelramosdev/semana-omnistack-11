import request from 'supertest';

import app from '../../src/app';

import db from '../../src/database/connection';

describe('ONG', () => {
  beforeEach( async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll( async () => {
    await db.destroy();
  });

  test('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG teste",
        email: "contato@ongteste.com",
        whatsapp: "0123456789",
        city: "São Paulo",
        uf: "SP",
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  })
})