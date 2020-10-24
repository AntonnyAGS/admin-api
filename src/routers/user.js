'use strict';

const express = require('express');

const user = express.Router();

const { UserController } = require('../controllers');

const { creatingUser, checkingAuth, checkingAdmin } = require ('../middlewares');

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
user.post('/', creatingUser, UserController.store);

/**
 * @swagger
 * /user:
 *  get:
 *    description: Use essa rota para listar os usuários.
 *    responses:
 *      '201':
 *        description: Success
 */
user.get('/', [ checkingAuth, checkingAdmin ], UserController.index);

module.exports = user;
