'use strict';

const express = require('express');

const auth = express.Router();

const { AuthController } = require('../controllers');

const { authorizingUser } = require('../middlewares');

// Routes
/**
 * @swagger
 * /auth:
 *  post:
 *    description: Use essa rota para logar usuários.
 *    responses:
 *      '200':
 *        description: Success
 */
auth.post('/', authorizingUser, AuthController.authenticate);

module.exports = auth;
