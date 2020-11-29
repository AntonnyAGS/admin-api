'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { PersonType, UserRole } = require('../../src/enums');

const { MongoMemoryServer } = require('mongodb-memory-server');

const { User: UserModel } = require('../../src/models');

const mongo = new MongoMemoryServer();
const bcrypt = require('bcryptjs');

const UserCredentials = {
  email: 'joazinhomock@gatinhos.com',
  password: '123456'
};
const User = {
  ...UserCredentials,
  name: 'João',
  password_repeat: '123456',
  role: UserRole.ADMIN
};
const users = [
  {
    email: 'caiozinhomock1@gatinhos.com',
    name: 'Caio',
    password: '123456',
    password_repeat: '123456',
    ra: '8193740954',
    role: UserRole.STUDENT
  },
  {
    email: 'joazinhomock1@gatinhos.com',
    name: 'João',
    password: '123456',
    password_repeat: '123456',
    ra: '812364683',
    role: UserRole.STUDENT
  },
  {
    email: 'alininhamock1@gatinhos.com',
    name: 'Aline',
    password: '123456',
    password_repeat: '123456',
    ra: '816343554',
    role: UserRole.STUDENT
  },
];

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
    await UserModel.create({...User, password: await bcrypt.hash('123456', 10)});
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
  it('GET on /user/id', async(done) => {
    const response = await request(app).get(`/user/${UserAuthenticated.user._id}`).set('Authorization', `Bearer ${UserAuthenticated.token}`);
    expect(response.status).toBe(200);
    done();
  });
  it('POST on /user/registermany', async(done) => {
    const response = await request(app).post('/user/registermany').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(users);
    expect(response.status).toBe(201);
    done();
  });

  it('POST on /user/registermany with unavailable RA/email', async(done) => {
    const response = await request(app).post('/user/registermany').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(users);
    expect(response.status).toBe(400);
    done();
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
