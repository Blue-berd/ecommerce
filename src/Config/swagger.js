import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Basic configuration for Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation for Express application",
    },
    servers: [
      {
        url: "http://localhost:3000/api/",
      },
    ],
    components: {
      securitySchemes: {
        sessionId: {
          type: "apiKey",
          in: "header",
          name: "session-id",
          description: "Session ID for user authentication",
        },
      },
    },
  },
  apis: ["./src/Features/*/api-docs.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
