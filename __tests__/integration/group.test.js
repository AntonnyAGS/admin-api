'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');


const mongo = new MongoMemoryServer();

const UserCredentials = {
  email: 'pedrinhomock@gatinhos.com',
  password: '123456'
};
const User = {
  ...UserCredentials,
  name: 'Pedro',
  password_repeat: '123456',
  isAdmin: true
};

const Group = {
  members_id: [
    '5fa066b87022770cf491f920',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0aa0e3394658399650c4b',
    '5fa0aa253d88e8878e84bd0d'
  ]
};

let UserAuthenticated = null;

beforeAll(async () => {
  process.env.SECRET_HASH = 'banana';
  const uri = await mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //eslint-disable-next-line
  console.log('Running on ', uri);
});
describe('Group', () => {
  it('POST on /group', async(done) => {
    const response = await request(app).post('/user').send(User);

    const responseAuth = await request(app).post('/auth').send(User);
    UserAuthenticated = responseAuth.body;

    const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    expect(responseGroup.status).toBe(201);
    done();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});