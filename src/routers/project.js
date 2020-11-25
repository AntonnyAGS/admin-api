'use strict';

const express = require('express');

const project = express.Router();

const { ProjectController } = require('../controllers');

const { checkingAuth, creatingProject } = require('../middlewares');

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

// Routes
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

module.exports = project;
