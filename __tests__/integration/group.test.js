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

const users = [
  {
    email: 'caiozinhomock@gatinhos.com',
    name: 'Caio',
    password: '123456',
    password_repeat: '123456'
  },
  {
    email: 'joazinhomock@gatinhos.com',
    name: 'João',
    password: '123456',
    password_repeat: '123456'
  },
  {
    email: 'alininhamock@gatinhos.com',
    name: 'Aline',
    password: '123456',
    password_repeat: '123456'
  },
];

const Group = {
  userId: [
    '5fa066b87022770cf491f920',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0aa0e3394658399650c4b',
    '5fa0aa253d88e8878e84bd0d'
  ]
};

let UserAuthenticated = null;
const usersId = [];

beforeAll(async () => {
  process.env.SECRET_HASH = 'banana';
  const uri = await mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //eslint-disable-next-line
  console.log('Running on ', uri);

  for(let user of users){
    const response = await request(app).post('/user').send(user);
    usersId.push(response.body.user._id);
  }

  await request(app).post('/user').send(User);
  const responseAuth = await request(app).post('/auth').send(User);
  UserAuthenticated = responseAuth.body;

});


describe('Group', () => {
  it('POST on /group', async(done) => {
    Group.userId = usersId;
    const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    //eslint-disable-next-line
    console.log('-------------------------------------------------------------------------');
    //eslint-disable-next-line
    console.log(responseGroup.body);
    expect(responseGroup.status).toBe(201);
    done();
  });

  it('POST on /group (Body with invalid objectID in userId)', async(done) => {
    Group.userId = ['5fa066b87022770cf491f920', '5fa0a9eda8203f9cdd4ea6e9', 'SIUGGFG643DSFFSSDFSDF'];
    const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    expect(responseGroup.status).toBe(400);
    done();
  });

  it('POST on /group (The body of the “userId” field is less than 3 ids)', async(done) => {
    Group.userId = [ '5fa066b87022770cf491f920', '5fa0a9eda8203f9cdd4ea6e9' ];
    const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    expect(responseGroup.status).toBe(400);
    done();
  });

  it('POST on /group (Body with nonexistent userId)', async(done) => {
    Group.userId = [ '5fa066b87022770cf491f920', '5fa0a9eda8203f9cdd4ea6e9', '5fa20ec3ecd0e6135a602c17' ];
    const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    expect(responseGroup.status).toBe(400);
    done();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
