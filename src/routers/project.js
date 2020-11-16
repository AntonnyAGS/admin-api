'use strict';

const express = require('express');

const project = express.Router();

const { ProjectController } = require('../controllers');

const { checkingAuth } = require('../middlewares');

// Routes
/**
 * @swagger
 * /project:
 *  get:
 *    tags:
 *      - project
 *    description: Use essa rota para listar projetos.
 *    summary: Listar todos os projetos.
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
project.get('/', checkingAuth, AuthController.authenticate);

module.exports = project;
