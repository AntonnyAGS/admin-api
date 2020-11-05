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
  isAdmin: true
};

let UserAuthenticated = null;

beforeAll(async () => {
  process.env.SECRET_HASH = 'banana';
  process.env.SECRET_REFRESH_HASH = 'bananana';
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
    UserAuthenticated = response.body;
    expect(response.status).toBe(200);
    done();
  });
  it('POST on /refresh-token', async(done) => {
    const response = await request(app).post('/auth/refresh-token').send({ refreshToken: UserAuthenticated.refreshToken });
    UserAuthenticated.refreshToken = response.body.refreshToken;
    UserAuthenticated.token = response.body.token;
    expect(response.status).toBe(201);
    done();
  });
  it('GET on /user', async(done) => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(401);
    done();
  });
  it('GET on /user', async(done) => {
    const response = await request(app).get('/user').set('Authorization', `Bearer ${UserAuthenticated.token}`);
    expect(response.status).toBe(200);
    done();
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
