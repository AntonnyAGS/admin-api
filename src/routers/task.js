'use strict';

const express = require('express');

const task = express.Router();

const { TaskController, CommentController } = require('../controllers');

const { checkingAuth, checkingAdmin, creatingTask, updatingTask } = require('../middlewares');

//Routes

/**
 * @swagger
 * /task:
 *  get:
 *    tags:
 *      - task
 *    description: Use essa rota para buscar uma task.
 *    summary: Listar as task.
 *    responses:
 *      '200':
 *        description: Success
 */
task.get('/project/:projectId', [checkingAuth, checkingAdmin], TaskController.show);

/**
 * @swagger
 * /task:
 *  post:
 *    tags:
 *      - task
 *    description: Use essa rota para criar uma task.
 *    summary: Criar uma task.
 *    responses:
 *      '201':
 *        description: Success
 */
task.post('/', [checkingAuth, checkingAdmin, creatingTask], TaskController.store);

/**
 * @swagger
 * /task:
 *  put:
 *    tags:
 *      - task
 *    description: Use essa rota para alterar uma task.
 *    summary: Aualizar uma task.
 *    responses:
 *      '200':
 *        description: Success
 */
task.put('/:id', [checkingAuth, checkingAdmin, updatingTask], TaskController.update);

//task.delete('/:id', [checkingAuth, checkingAdmin], TaskController.delete);

/**
 * @swagger
 * /task/comment:
 *  post:
 *    tags:
 *      - task
 *    description: Use essa rota para criar um commentario em uma task.
 *    summary: cria um comentario.
 *    responses:
 *      '201':
 *        description: Success
 */
task.post('/comment', [checkingAuth], CommentController.store);

/**
 * @swagger
 * /task/comment:
 *  put:
 *    tags:
 *      - task
 *    description: Use essa rota para atualizar um comentário em uma task.
 *    summary: altera um comentario.
 *    responses:
 *      '200':
 *        description: Success
 */
task.put('/comment/:id', [checkingAuth], CommentController.update);

/**
 * @swagger
 * /task/comment:
 *  get:
 *    tags:
 *      - task
 *    description: Use essa rota para listar os comentários em uma task.
 *    summary: listar os comentarios.
 *    responses:
 *      '200':
 *        description: Success
 */
task.get('/:taskId/comment/', [checkingAuth], CommentController.show);

module.exports = task;
