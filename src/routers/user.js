'use strict';

const express = require('express');

const user = express.Router();

// Routes
/**
 * @swagger
 * /user:
 *  get:
 *    description: Use this to get all admin users
 *    responses:
 *      '200':
 *        description: Success
 */
user.get('/', (req, res) => {
  res.status(200).send();
});

module.exports = user;
