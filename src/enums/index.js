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

const FileType = Object.freeze({
  LOGO: 'LOGO',
  REQUIREMENTS_DOCUMENT: 'REQUIREMENTS_DOCUMENT'
});

const ScoreType = Object.freeze({
  DEVELOPMENT: 'DEVELOPMENT',
  PRESENTATION: 'PRESENTATION',
  FINAL: 'FINAL'
});

module.exports = { ProjectStatus, PersonType, UserRole, FileType, ScoreType };
