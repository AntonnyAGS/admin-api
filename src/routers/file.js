'use strict';

const express = require('express');
const { FileController } = require('../controllers');
const { checkingAuth, storeFile, checkingAdmin } = require('../middlewares');

const file = express.Router();

// Routes
/**
 * @swagger
 * /file/{prjectId}:
 *  post:
 *    description: Use essa rota para armazenar arquivos no storage.
 *    tags:
 *      - file
 *    summary: Armazena arquivo no storage.
 *    responses:
 *      '201':
 *        description: Success
 *    parameters:
 *      - in: body
 *        name: projectFiles
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  base64:
 *                      type: string
 *                  fileName:
 *                      type: string
 *                  fileType:
 *                      type: string
 *                      enum: [LOGO, REQUIREMENTS_DOCUMENT]
 *                  required:
 *                      - base64
 *                      - fileName
 *                      - fileType
 */
file.post('/:projectId', [checkingAuth,checkingAdmin, storeFile ], FileController.store);

/**
 * @swagger
 * /file/{projectId}:
 *  get:
 *    description: Use essa rota para listar arquivos de um determinado projeto.
 *    tags:
 *      - file
 *    summary: Lista os arquivos por projeto.
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  projectId:
 *                      type: string
 *                  fileName:
 *                      type: string
 *                  fileType:
 *                      type: string
 *                      enum: [LOGO, REQUIREMENTS_DOCUMENT]
 *                  fileUrl:
 *                      type: string
 */
file.get('/:projectId', checkingAuth, FileController.showByProjectId);

/**
 * @swagger
 * /file:
 *  get:
 *    description: Use essa rota para listar todos os arquivos.
 *    tags:
 *      - file
 *    summary: Lista todos os arquivos.
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema: bearer
 *    responses:
 *      '200':
 *        description: Success
 *        schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  projectId:
 *                      type: string
 *                  fileName:
 *                      type: string
 *                  fileType:
 *                      type: string
 *                      enum: [LOGO, REQUIREMENTS_DOCUMENT]
 *                  fileUrl:
 *                      type: string
 */
file.get('/', checkingAuth, FileController.index);


module.exports = file;
