'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');


const mongo = new MongoMemoryServer();

beforeAll(async () => {
  const uri = await mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //eslint-disable-next-line
  console.log('Running on ', uri);
});
describe('User', () => {
  it('POST on /user', async (done) => {
    const User = {
      name: 'João',
      email: 'joazinhomock@gatinhos.com',
      password: '123456',
      password_repeat: '123456'
    };
    const response = await request(app).post('/user').send(User);
    expect(response.status).toBe(201);
    done();
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
