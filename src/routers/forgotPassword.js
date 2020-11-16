'use strict';

const express = require('express');

const forgotPassword = express.Router();

const { ForgotPasswordController } = require('../controllers');

const { checkingForgotPassword } = require('../middlewares');

// Routes
/**
 * @swagger
 * /forgot-password:
 *  post:
 *    tags:
 *      - forgot-password
 *    summary:
 *      Envia um email com o link para recuperação de senha.
 *    description: Use essa rota para enviar email de recuperação de senha.
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description: Success
 */
forgotPassword.post('/', checkingForgotPassword, ForgotPasswordController.forgot);

module.exports = forgotPassword;
