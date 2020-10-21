'use strict';

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Admin API',
      description: 'API responsável pela parte de admin do projeto de Fábrica de Software',
      contact: {
        name: 'Grupo Admin'
      }
    },
    servers: ['http://0.0.0.0:3001']
  },
  apis: ['src/routers/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerUiServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(swaggerDocs);

module.exports = { swaggerUiServe, swaggerSetup };
