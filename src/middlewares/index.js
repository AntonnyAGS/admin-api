const creatingUser = require('./creatingUser');
const authorizingUser = require('./authorizingUser');
const checkingAuth = require('./checkingAuth');
const checkingAdmin = require('./checkingAdmin');
const creatingGroup = require('./creatingGroup');
const validatingToken = require('./validatingToken');
const creatingManyUsers = require('./creatingManyUsers');

module.exports = {
  creatingUser,
  authorizingUser,
  checkingAuth,
  checkingAdmin,
  validatingToken,
  creatingGroup,
  creatingManyUsers
};
