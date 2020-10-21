'use strict';

const express = require('express');
const { swaggerUiServe, swaggerSetup } = require(__CONFIG + 'swagger');

const router = express.Router();

// Setup Swagger
router.use('/api-docs', swaggerUiServe);
router.get('/api-docs',  swaggerSetup);



router.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = router;
