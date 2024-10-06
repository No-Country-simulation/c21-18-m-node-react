import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adopción de mascotas',
      description: 'Documentación del Backend de la aplicación para adopción de mascotas',
      version: '1.0',
    },
  },
  apis: ['./src/docs/*.yaml'],
};

export default swaggerOptions;