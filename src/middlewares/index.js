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

module.exports = {
  creatingUser,
  authorizingUser,
  checkingAuth,
  checkingAdmin,
  validatingToken,
  creatingGroup,
  creatingManyUsers,
  checkingForgotPassword,
  creatingClientUser
};
