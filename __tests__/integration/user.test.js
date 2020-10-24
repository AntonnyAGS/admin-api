'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');


const mongo = new MongoMemoryServer();

const UserCredentials = {
  email: 'joazinhomock@gatinhos.com',
  password: '123456'
};
const User = {
  ...UserCredentials,
  name: 'João',
  password_repeat: '123456',
};

beforeAll(async () => {
  process.env.SECRECT_HASH = 'banana';
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
    const response = await request(app).post('/user').send(User);
    expect(response.status).toBe(201);
    done();
  });
  it('POST on /auth', async(done) => {
    const response = await request(app).post('/auth').send(User);
    expect(response.status).toBe(200);
    done();
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
