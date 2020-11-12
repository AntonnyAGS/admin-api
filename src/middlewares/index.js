const creatingUser = require('./creatingUser');
const authorizingUser = require('./authorizingUser');
const checkingAuth = require('./checkingAuth');
const checkingAdmin = require('./checkingAdmin');
const checkingForgotPassword = require('./checkingForgotPassword');

module.exports = { creatingUser, authorizingUser, checkingAuth, checkingAdmin, checkingForgotPassword };
