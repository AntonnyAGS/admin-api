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
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *            - password_repeat
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            password_repeat:
 *              type: string
 */
user.post('/', creatingUser, UserController.store);

/**
 * @swagger
 * /user:
 *  get:
 *    description: Use essa rota para listar os usuários (o usuário logado deve ser um administrador).
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *      - in: query
 *        name: isAdmin
 *        schema:
 *          type: boolean
 *    responses:
 *      '200':
 *        description: Success
 */
user.get('/', [ checkingAuth, checkingAdmin ], UserController.index);

module.exports = user;
