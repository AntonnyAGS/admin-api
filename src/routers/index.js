'use strict';

const user = require('./user');
const auth = require('./auth');
const forgotPassword = require('./forgotPassword');
const group = require('./group');
const project = require('./project');
const file = require('./file');

const express = require('express');
const { swaggerUiServe, swaggerSetup } = require('../config/swagger');

const router = express.Router();

// Setup Swagger
router.use('/api-docs', swaggerUiServe);
router.get('/api-docs',  swaggerSetup);

router.use('/user', user);
router.use('/auth', auth);
router.use('/forgot-password', forgotPassword);
router.use('/group', group);
router.use('/project', project);
router.use('/file', file);

router.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = router;
