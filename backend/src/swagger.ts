import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { PORT } from "./config";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fullstack Mastery API",
      version: "1.0.0",
      description: "API documentation for the Fullstack Mastery project",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
}
