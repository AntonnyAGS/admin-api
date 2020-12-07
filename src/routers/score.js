'use strict';

const express = require('express');

const score = express.Router();

const { ScoreController } = require('../controllers');

const { checkingAuth, getOneProject, checkingAdmin, creatingScore, updatingScore } = require('../middlewares');

/**
 * @swagger
 * /score:
 *  get:
 *    tags:
 *      - score
 *    description: Use essa rota para pegar as notas de um projeto.
 *    summary: Listar um projetos.
 *    responses:
 *      '200':
 *        description: Success
 */
score.get('/:id', [checkingAuth, getOneProject, checkingAdmin], ScoreController.find);

/**
 * @swagger
 * /score:
 *  post:
 *    tags:
 *      - score
 *    description: Use essa rota para pegar as notas de um projeto.
 *    summary: Listar um projetos.
 *    responses:
 *      '200':
 *        description: Success
 */
score.post('/', [checkingAuth, checkingAdmin, creatingScore], ScoreController.store);

/**
 * @swagger
 * /score:
 *  post:
 *    tags:
 *      - score
 *    description: Use essa rota para atualizar as notas de um projeto.
 *    summary: Listar um projetos.
 *    responses:
 *      '200':
 *        description: Success
 */
score.put('/', [checkingAuth, checkingAdmin, updatingScore], ScoreController.update);

module.exports = score;
