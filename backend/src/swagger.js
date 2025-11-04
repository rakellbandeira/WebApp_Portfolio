const swaggerdoc = require('swagger-jsdoc');

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

const swaggerSpec = swaggerdoc(options);
module.exports = swaggerSpec;