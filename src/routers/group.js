'use strict';

const express = require('express');
const GroupController = require('../controllers/GroupController');
const {checkingAuth, checkingAdmin, creatingGroup} = require('../middlewares');

const group = express.Router();

// Routes
/**
 * @swagger
 * /group:
 *  post:
 *    tags:
 *      - group
 *    description: Use essa rota para criação de grupos.
 *    summary: Adiciona um novo grupo na base de dados.
 *    responses:
 *      '201':
 *        description: Success
 *        type: object
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              usersIds:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          createdAt:
 *                              type: string
 *                          updatedAt:
 *                              type: string
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *      - in: body
 *        name: group
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - userId:
 *          properties:
 *            name:
 *              type: string
 *            usersIds:
 *              type: array
 *              items:
 *                  type: string
 */
group.post('/', [ checkingAuth, checkingAdmin, creatingGroup ], GroupController.store);

/**
 * @swagger
 * /group:
 *  get:
 *    tags:
 *      - group
 *    description: Use essa rota para retornar a lista dos grupos.
 *    summary: Retorna uma lista contendo todos os grupos.
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *    responses:
 *      '200':
 *        description: Success
 *        type: array
 *        schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  users:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
 */
group.get('/', [ checkingAuth, checkingAdmin ], GroupController.index);
group.get('/:groupId', [ checkingAuth, checkingAdmin ], GroupController.show);

module.exports = group;
