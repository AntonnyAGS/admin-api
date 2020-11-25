'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const { PersonType, UserRole } = require('../../src/enums');
const bcrypt = require('bcryptjs');

const mongo = new MongoMemoryServer();

const { Project } = require('../../src/models');

const { User: UserModel } = require('../../src/models');

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

const users = [
  {
    email: 'caiozinhomock@gatinhos.com',
    name: 'Caio',
    password: '123456',
    password_repeat: '123456',
    role: UserRole.STUDENT,
    ra: 'd122132132'
  },
  {
    email: 'joazinhomock@gatinhos.com',
    name: 'João',
    password: '123456',
    password_repeat: '123456',
    role: UserRole.STUDENT,
    ra: 'dsadsasdsasda'
  },
  {
    email: 'alininhamock@gatinhos.com',
    name: 'Aline',
    password: '123456',
    password_repeat: '123456',
    role: UserRole.STUDENT,
    ra: 'dsaew344332'
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

  await UserModel.create({ ...User, password: await bcrypt.hash('123456', 10)});
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

  it('POST on /user', async(done) => {
    const _client = {
      name: 'User',
      phone: 'banana',
      password: 'thisshouldbeencrypted',
      password_repeat: 'thisshouldbeencrypted',
      email: 'thisshouldbevalidated@gmil.com',
      type: 'PERSON', // Why dont use a enum??????????
      cpf: 'banana',
      role: UserRole.CLIENT,
      personType: PersonType.PERSON
    };
    const response = await request(app).post('/user').send(_client);
    ClientResponse = response.body.user;
    expect(response.status).toBe(201);
    done();
  });

  it('POST on /auth', async(done) => {
    const response = await request(app).post('/auth').send({ email: 'thisshouldbevalidated@gmil.com', password: 'thisshouldbeencrypted'});
    UserAuthenticated = response.body;
    expect(response.status).toBe(200);
    done();
  });

  it('CREATE a project (MOCK IT)', async(done) => {
    const project = {
      name: 'Teste',
      description: 'Testeds',
      clientId: ClientResponse._id
    };
    const response = await request(app).post('/project').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(project);
    expect(response.status).toBe(201);
    done();
  });

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
