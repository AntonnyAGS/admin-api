'use strict';

const express = require('express');

const project = express.Router();

const { ProjectController } = require('../controllers');

const { checkingAuth, creatingProject, getOneProject, updatingProject } = require('../middlewares');

// Routes
/**
 * @swagger
 * /project:
 *  get:
 *    tags:
 *      - project
 *    description: Use essa rota para listar projetos.
 *    summary: Listar todos os projetos.
 *    responses:
 *      '200':
 *        description: Success
 */
project.get('/', checkingAuth, ProjectController.index);

/**
 * @swagger
 * /project:
 *  get:
 *    tags:
 *      - project
 *    description: Use essa rota para pegar um projeto.
 *    summary: Listar um projetos.
 *    responses:
 *      '200':
 *        description: Success
 */
project.get('/:id', [checkingAuth, getOneProject], ProjectController.get);

/**
 * @swagger
 * /project:
 *  post:
 *    tags:
 *      - project
 *    description: Use essa rota para criar projetos.
 *    summary: Criar um projeto.
 *    parameters:
 *      - in: body
 *        name: project
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 */
project.post('/', [checkingAuth, creatingProject], ProjectController.store);

/**
 * @swagger
 * /project:
 *  put:
 *    tags:
 *      - project
 *    description: Use essa rota para criar projetos.
 *    summary: Criar um projeto.
 *    parameters:
 *      - in: body
 *        name: project
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - description
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 */
project.put('/', [checkingAuth, updatingProject], ProjectController.update);

module.exports = project;
