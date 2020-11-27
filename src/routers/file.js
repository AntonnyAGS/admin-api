'use strict';

const express = require('express');
const { FileController } = require('../controllers');
const { checkingAuth, storeFile } = require('../middlewares');

const file = express.Router();

// Routes
/**
 * @swagger
 * /user/registermany:
 *  post:
 *    description: Use essa rota para armazenar arquivos no storage.
 *    tags:
 *      - user
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
 *                      - fileExtension
 *                      - fileType
 */
file.post('/:projectId', [ storeFile ], FileController.store);

module.exports = file;
