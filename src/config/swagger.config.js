const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RestoBar API',
      version: '1.0.0',
      description: 'API para procesamiento de imágenes y estadísticas',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://restobar-33413.web.app',
        description: 'Servidor de producción',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // archivos a escanear
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 