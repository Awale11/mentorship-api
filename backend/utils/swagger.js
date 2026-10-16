import swaggerJSDoc from "swagger-jsdoc";
 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
        // here ausi, u can change projectiga markaas aadka shaqayneeso magaciisa
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for our task manager backend'
    },
    servers: [
      {
        // here in future u change url-ka aad sameeneeso
        url: 'http://localhost:5000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
//  folder-ka routes-ka ayku yaalan otomatically ayuu kasoo aqrisanaa 
  apis: ['./routes/*.js'] // Where your route files live
};

export const swaggerSpec = swaggerJSDoc(options);