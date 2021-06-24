'use strict';

const UserController = require('./UserController');
const AuthController = require('./AuthController');
const ForgotPasswordController = require('./ForgotPasswordController');
const ProjectController = require('./ProjectController');
const FileController = require('./FileController');
const ScoreController = require('./ScoreController');
const TaskController = require('./TaskController');
const CommentController = require('./CommentController');

module.exports = {
  UserController,
  AuthController,
  ForgotPasswordController,
  ProjectController,
  FileController,
  ScoreController,
  TaskController,
  CommentController
};
