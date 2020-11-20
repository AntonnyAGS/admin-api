'use strict';

const { Project } = require('../models');
const { PersonType, ProjectStatus } = require('../enums');

const createClient = async () => {
  const _client = {
    name: 'User',
    phone: 'banana',
    password: 'thisshouldbeencrypted',
    email: 'thisshouldbevalidated',
    type: PersonType.PERSON, // Why dont use a enum??????????
    cpf: 'banana',
    enterpriseName: 'codeitman'
  };
  // await Client.create(_client);
};

const createProject = async () => {
  // const [client] = await Client.find();
  // const _project = {
  //   name: 'Project1',
  //   description: 'It was very good day if i dont need code',
  //   clientId: client._id,
  //   status: ProjectStatus.WAITING //YES. ENUMS
  // };

  // await Project.create(_project);
};


module.exports = { createClient, createProject };
