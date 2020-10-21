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
    }
  }
};
