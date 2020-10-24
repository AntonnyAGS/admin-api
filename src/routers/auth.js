'use strict';

const express = require('express');

const auth = express.Router();

const { AuthController } = require(__CONTROLLERS);

const { authorizingUser } = require(__MIDDLEWARES);

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
auth.post('/', authorizingUser.validateAuth, AuthController.authenticate);

module.exports = auth;
