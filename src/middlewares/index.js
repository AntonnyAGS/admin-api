const creatingUser = require('./creatingUser');
const authorizingUser = require('./authorizingUser');
const checkingAuth = require('./checkingAuth');
const checkingAdmin = require('./checkingAdmin');
const checkingForgotPassword = require('./checkingForgotPassword');
const creatingGroup = require('./creatingGroup');
const validatingToken = require('./validatingToken');

module.exports = { creatingUser, authorizingUser, checkingAuth, checkingAdmin, validatingToken, creatingGroup, checkingForgotPassword };
