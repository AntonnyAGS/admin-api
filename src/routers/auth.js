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
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 */
auth.post('/', authorizingUser, AuthController.authenticate);

module.exports = auth;
