'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');


const mongo = new MongoMemoryServer();

const { Project, Client } = require('../../src/models');

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
  usersIds: [
    '5fa066b87022770cf491f920',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0a9eda8203f9cdd4ea6e9',
    '5fa0aa0e3394658399650c4b',
    '5fa0aa253d88e8878e84bd0d'
  ]
};

let UserAuthenticated = null;
const usersId = [];

let responseGroup = null;

let ClientResponse = null;

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
    Group.usersIds = usersId;

    responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
    expect(responseGroup.status).toBe(201);
    done();
  });

  it('POST on /client', async(done) => {
    const _client = {
      name: 'User',
      phone: 'banana',
      password: 'thisshouldbeencrypted',
      email: 'thisshouldbevalidated',
      type: 'PERSON', // Why dont use a enum??????????
      cpf: 'banana',
      enterpriseName: 'codeitman'
    };
    ClientResponse = await Client.create(_client);
    done();
  });

  it('CREATE a project (MOCK IT)', async(done) => {
    const project = {
      name: 'Teste',
      description: 'Testeds',
      clientId: ClientResponse._id,
      status: 'WAITING',
      groupsId: [responseGroup._id]
    };
    const response = await Project.create(project);
    done();
  });

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
