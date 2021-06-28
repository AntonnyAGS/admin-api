'use strict';

const express = require('express');

const task = express.Router();

const { TaskController } = require('../controllers');

const { checkingAuth, checkingAdmin, creatingTask, updatingTask } = require('../middlewares');

//Routes

/**
 * @swagger
 * /score:
 *  get:
 *    tags:
 *      - task
 *    description: Use essa rota para buscar uma task.
 *    summary: Listar as task.
 *    responses:
 *      '200':
 *        description: Success
 */
task.get('/project/:projectId', [checkingAuth], TaskController.show);

/**
 * @swagger
 * /score:
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
 * /score:
 *  put:
 *    tags:
 *      - task
 *    description: Use essa rota para alterar uma task.
 *    summary: Aualizar uma task.
 *    responses:
 *      '200':
 *        description: Success
 */
task.put('/:id', [checkingAuth, updatingTask], TaskController.update);

//task.delete('/:id', [checkingAuth, checkingAdmin], TaskController.delete);

//task.post('/comment', )

module.exports = task;
