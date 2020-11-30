'use strict';

const express = require('express');

const user = express.Router();

const { UserController } = require('../controllers');

const { creatingUser, checkingAuth, checkingAdmin, creatingManyUsers, creatingClientUser } = require ('../middlewares');

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
 *            - role
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            password_repeat:
 *              type: string
 *            role:
 *              type: string
 *              enum: [ADMIN, CLIENT, STUDENT]
 *            personType:
 *              description: Se o role for "CLIENT", tem que mandar isso.
 *              type: string
 *              enum: [PERSON, COMPANY]
 *            cpf:
 *              type: string
 *              description: Se o personType for "PERSON", tem que mandar isso.
 *            cnpj:
 *              type: string
 *              description: Se o personType for "COMPANY", tem que mandar isso.
 *            phone:
 *              type: string
 *            ra:
 *              type: string
 */
user.post('/', [ creatingUser, creatingClientUser ], UserController.store);
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
*            - role
*          properties:
*            name:
*              type: string
*            email:
*              type: string
*            password:
*              type: string
*            password_repeat:
*              type: string
*            role:
*              type: string
*              enum: [ADMIN, CLIENT, STUDENT]
*            personType:
*              description: Se o role for "CLIENT", tem que mandar isso.
*              type: string
*              enum: [PERSON, COMPANY]
*            cpf:
*              type: string
*              description: Se o personType for "PERSON", tem que mandar isso.
*            cnpj:
*              type: string
*              description: Se o personType for "COMPANY", tem que mandar isso.
*            phone:
*              type: string
*            ra:
*              type: string
*/
user.post('/create-admin', [ creatingUser, checkingAuth, checkingAdmin ], UserController.store);

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
 *        name: role
 *        schema:
 *          type: string
 *          enum: [ADMIN, CLIENT, STUDENT]
 *        required: true
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                name:
 *                  type: string
 *                role:
 *                  type: string
 *                  enum: [ADMIN, CLIENT, STUDENT]
 *                email:
 *                  type: string
 *                phone:
 *                  type: string
 *                cpf:
 *                  type: string
 *                personType:
 *                  type: string
 *                  enum: [COMPANY, PERSON]
 *                cnpj:
 *                  type: string
 */
user.get('/', [ checkingAuth, checkingAdmin ], UserController.index);

user.get('/:userId', [ checkingAuth, checkingAdmin ], UserController.show);

/**
 * @swagger
 * /user/register-many:
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
user.post('/register-many', [checkingAuth, checkingAdmin, creatingManyUsers], UserController.storeMany);

module.exports = user;
