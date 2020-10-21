'use strict';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');

describe('User', () => {

  it('Teste rota /user', async (done) => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    done();
  });

});
