'use strict';

const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const bcrypt = require('bcryptjs');
const { PersonType, UserRole } = require('../../src/enums');

const { User: UserModel } = require('../../src/models');

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

const users = [
  {
    email: 'caiozinhomock@gatinhos.com',
    name: 'Caio',
    password: '123456',
    password_repeat: '123456',
    ra: '1654654',
    role: UserRole.STUDENT
  },
  {
    email: 'joazinhomock@gatinhos.com',
    name: 'João',
    password: '123456',
    password_repeat: '123456',
    ra: '16546dsdsasda',
    role: UserRole.STUDENT
  },
  {
    email: 'alininhamock@gatinhos.com',
    name: 'Aline',
    password: '123456',
    password_repeat: '123456',
    ra: '165465sddsadsa4',
    role: UserRole.STUDENT
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
let projectCreated = null;
let taskCreated = null;

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

  await UserModel.create({ ...User, password: await bcrypt.hash('123456', 10) });
  const responseAuth = await request(app).post('/auth').send(User);
  UserAuthenticated = responseAuth.body;

  Group.usersIds = usersId;
  const responseGroup = await request(app).post('/group').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(Group);
  groupCreated = responseGroup.body;

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
  const ClientResponse =  (await request(app).post('/user').send(_client)).body;

  const project = {
    name: 'Teste',
    description: 'Testeds',
    clientId: ClientResponse._id
  };
  const response = await request(app).post('/project').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(project);
  projectCreated = response.body;

});

let groupCreated = null;

describe('Task', () => {
  it('POST on /task', async(done) => {

    const newTask = {
      'projectId': '507f1f77bcf86cd799439011',
      'groupId': '507f1f77bcf86cd799439022',
      'dateStart': '2020-03-01T01:10:00',
      'dateEnd': '2020-04-01T01:10:00',
      'description': 'Task criada'
    };

    const response = await request(app).post('/task').set('Authorization', `Bearer ${UserAuthenticated.token}`).send(newTask);

    taskCreated = response.body;

    expect(response.status).toBe(201);
    done();
  });

  it('GET on /task/project/projectId', async(done) => {
    const response = await request(app).get('/task/project/507f1f77bcf86cd799439011').set('Authorization', `Bearer ${UserAuthenticated.token}`);
    expect(response.status).toBe(200);
    done();
  });

  it('PUT on /task/taskId', async(done) => {

    const otherTask = {
      'projectId': '507f1f77bcf86cd799439011',
      'groupId': '507f1f77bcf86cd799439022',
      'dateStart': '2020-03-01T01:10:00',
      'dateEnd': '2020-04-01T01:10:00',
      'description': 'Task alterada'
    };

    const response = await request(app).put('/task/'+taskCreated._id).set('Authorization', `Bearer ${UserAuthenticated.token}`).send(otherTask);

    expect(response.status).toBe(201);
    done();
  });

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});
