import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API",
      version: "1.0.0",
      description: "API for uber backend",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // include all route files under the routes folder so that JSDoc comments
  // written there get picked up automatically
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Serve Swagger documentation on a specific route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// apis
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", captainRoutes);

export default app;
