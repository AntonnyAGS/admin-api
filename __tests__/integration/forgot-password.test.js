'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { UserRole } = require('../../src/enums');


// Mocking nodemailer //
jest.mock('nodemailer', () => {
  const sendMailMock = jest.fn();
  const sendCreateTransport = jest.fn();
  sendCreateTransport.mockReturnValue({ sendMail: sendMailMock });
  return {
    createTransport: sendCreateTransport,
  };
});

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
  role: UserRole.ADMIN
};

beforeAll(async () => {
  process.env.SECRET_HASH = 'banana';
  process.env.SECRET_REFRESH_HASH = 'bananana';
  process.env.EMAIL_USER = 'adfabricadesoftware@gmail.com';
  process.env.EMAIL_PASSWORD = 'banana789';
  process.env.EMAIL_PORT = '587';
  process.env.EMAIL_HOST = 'smtp.gmail.com';



  const uri = await mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //eslint-disable-next-line
  console.log('Running on ', uri);
});

describe('Group', () => {
  it('POST on /user', async(done) => {
    const response = await request(app).post('/user').send(User);
    expect(response.status).toBe(201);
    done();
  });
  it('POST on /forgot-password', async(done) => {
    const response = await request(app).post('/forgot-password').send({email: User.email});
    expect(response.status).toBe(200);
    done();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
