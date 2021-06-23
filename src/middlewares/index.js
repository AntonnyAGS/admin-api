'use strict';

const creatingUser = require('./creatingUser');
const authorizingUser = require('./authorizingUser');
const checkingAuth = require('./checkingAuth');
const checkingAdmin = require('./checkingAdmin');
const checkingForgotPassword = require('./checkingForgotPassword');
const creatingGroup = require('./creatingGroup');
const validatingToken = require('./validatingToken');
const creatingManyUsers = require('./creatingManyUsers');
const creatingClientUser = require('./creatingClientUser');
const creatingProject = require('./creatingProject');
const storeFile = require('./storeFile');
const getOneProject = require('./getOneProject');
const updatingProject = require('./updatingProject');
const creatingScore = require('./creatingScore');
const updatingScore = require('./updatingScore');
const creatingTask = require('./creatingTask');
const updatingTask = require('./updatingTask');

module.exports = {
  creatingUser,
  authorizingUser,
  checkingAuth,
  checkingAdmin,
  validatingToken,
  creatingGroup,
  creatingManyUsers,
  checkingForgotPassword,
  creatingClientUser,
  creatingProject,
  storeFile,
  getOneProject,
  updatingProject,
  creatingScore,
  updatingScore,
  creatingTask,
  updatingTask
};
