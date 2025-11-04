const swaggerJsdoc = require('swagger-jsdoc');
console.log('Swagger file is being processed now');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rakell Portfolio API',
      version: '1.0.0',
      description: 'API documentation for personal portfolio application'
    },
    servers: [
      {
        url: process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}/api` 
          : 'http://localhost:5000/api',
        description: process.env.VERCEL_URL 
          ? 'Production server' 
          : 'Local development server'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/models/*.js'] // Path to the API routes and model files
};

console.log('Swagger options:', options);

const swaggerSpec = swaggerJsdoc(options);
console.log('Swagger spec generated');

module.exports = swaggerSpec;