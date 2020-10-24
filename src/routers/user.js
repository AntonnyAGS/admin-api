'use strict';

const express = require('express');

const user = express.Router();

const { UserController } = require('../controllers');

const { creatingUser } = require ('../middlewares');

// Routes
/**
 * @swagger
 * /user:
 *  post:
 *    description: Use essa rota para criação de usuários admin.
 *    responses:
 *      '201':
 *        description: Success
 */
user.post('/', creatingUser.validateRegister, UserController.store);

module.exports = user;
