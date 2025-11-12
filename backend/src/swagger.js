import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:5000',
        description: process.env.VERCEL_URL 
          ? 'Production server' 
          : 'Local development server'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API routes files with JSDoc comments
};

console.log('Swagger options:', options);

const swaggerSpec = swaggerJsdoc(options);
console.log('Swagger spec generated');

export default swaggerSpec;