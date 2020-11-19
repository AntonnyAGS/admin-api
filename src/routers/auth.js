'use strict';

const express = require('express');

const auth = express.Router();

const { AuthController } = require('../controllers');

const { authorizingUser, validatingToken } = require('../middlewares');

// Routes
/**
 * @swagger
 * /auth:
 *  post:
 *    tags:
 *      - auth
 *    description: Use essa rota para logar usuários.
 *    summary: Retorna tokens (de acesso e de refresh válidos) e adicionar esses tokens no banco de dados.
 *    parameters:
 *      - in: body
 *        name: user
 *        required: true
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

/**
 * @swagger
 * /refresh-token:
 *  post:
 *    tags:
 *      - auth
 *    description: Use essa rota fazer refresh do token de acesso.
 *    summary: Retorna um token de acesso válido a partir de um refresh token válido e faz as devidas operações no banco de dados.
 *    parameters:
 *      - in: body
 *        name: user
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - refreshToken
 *          properties:
 *            refreshToken:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 */
auth.post('/refresh-token', validatingToken, AuthController.refresh);

module.exports = auth;
