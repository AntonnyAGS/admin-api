'use strict';

const express = require('express');
const GroupController = require('../controllers/GroupController');
const {checkingAuth, checkingAdmin} = require('../middlewares');

const group = express.Router();

// Routes
/**
 * @swagger
 * /group:
 *  post:
 *    tags:
 *      - admin
 *    description: Use essa rota para criação de grupos.
 *    summary: Adiciona um novo grupo na base de dados.
 *    responses:
 *      '201':
 *        description: Success
 *    parameters:
 *      - in: body
 *        name: group
 *        schema:
 *          type: object
 *          required:
 *            - group_name
 *            - id_members:
 *          properties:
 *            group_name:
 *              type: string
 *            id_members:
 *              type: array
 *              items:
 *                  type: string
 */
group.post('/', [ checkingAuth, checkingAdmin ], GroupController.store);

/**
 * @swagger
 * /group:
 *  get:
 *    tags:
 *      - admin
 *    description: Use essa rota para retornar a lista dos grupos.
 *    summary: Retorna uma lista contendo todos os grupos.
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *      - in: query
 *        name: isAdmin
 *        schema:
 *          type: boolean
 *    responses:
 *      '201':
 *        description: Success
 *        type: array
 *        schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  group_name:
 *                      type: string
 *                  members:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              member_id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              email:
 *                                  type: string
 */
group.get('/', [ checkingAuth, checkingAdmin ],(req,res) => {});

module.exports = group;
