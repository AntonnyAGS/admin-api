'use strict';

const UserController = require('./UserController');
const AuthController = require('./AuthController');
const ForgotPasswordController = require('./ForgotPasswordController');
const ProjectController = require('./ProjectController');
const FileController = require('./FileController');
const ScoreController = require('./ScoreController');
const TaskController = require('./TaskController');

module.exports = {
  UserController,
  AuthController,
  ForgotPasswordController,
  ProjectController,
  FileController,
  ScoreController,
  TaskController
};
