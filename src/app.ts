import express, { json, urlencoded, Request as ExRequest, Response as ExResponse, NextFunction } from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./errorHandler";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

RegisterRoutes(app);

app.use((req, res, next) => {
  res.status(404).send({ status: "not found" });
});

app.use(errorHandler);
