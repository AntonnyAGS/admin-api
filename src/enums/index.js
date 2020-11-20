'use strict';

const ProjectStatus = Object.freeze({
  APPROVED: 'APPROVED',
  FINISHED: 'FINISHED',
  WAITING: 'WAITING',
  REPROVED: 'REPROVED',
  DOING: 'DOING'
});

const PersonType = Object.freeze({
  PERSON: 'PERSON',
  COMPANY: 'COMPANY'
});

const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  CLIENT: 'CLIENT'
});

module.exports = { ProjectStatus, PersonType, UserRole };
