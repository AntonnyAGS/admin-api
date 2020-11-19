'use strict';

const express = require('express');

const user = express.Router();

const { UserController } = require('../controllers');

const { creatingUser, checkingAuth, checkingAdmin, creatingManyUsers } = require ('../middlewares');

// Routes
/**
 * @swagger
 * /user:
 *  post:
 *    tags:
 *      - user
 *    summary: Adiciona um novo usuário ao banco de dados.
 *    description: Use essa rota para criação de usuários admin.
 *    responses:
 *      '201':
 *        description: Success
 *    parameters:
 *      - in: body
 *        name: user
 *        required: true
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
 *    tags:
 *      - user
 *    summary:
 *      Retorna a lista com todos os usuários.
 *    description: Use essa rota para listar os usuários (o usuário logado deve ser um administrador).
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: false
 *        description: Use esse parametro consultar somente 1 usuário.
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *        required: true
 *      - in: query
 *        name: isAdmin
 *        schema:
 *          type: boolean
 *        required: true
 *    responses:
 *      '200':
 *        description: Success
 */
user.get('/', [ checkingAuth, checkingAdmin ], UserController.index);

user.get('/:userId', [ checkingAuth, checkingAdmin ], UserController.show);

/**
 * @swagger
 * /user/registermany:
 *  post:
 *    description: Use essa rota para criação de usuários admin.
 *    tags:
 *      - user
 *    summary:
 *      Cadastra vários usuários (usados para cadastrar vários alunos)
 *    responses:
 *      '201':
 *        description: Success
 *    parameters:
 *      - in: body
 *        name: users
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  ra:
 *                      type: string
 *                  required:
 *                      - name
 *                      - email
 *                      - password
 */
user.post('/registermany', [checkingAuth, checkingAdmin, creatingManyUsers], UserController.storeMany);

module.exports = user;
