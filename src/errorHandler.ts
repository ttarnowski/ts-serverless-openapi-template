import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { ApiError } from "./api/ApiError";
import { AuthError } from "./api/auth/middleware";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "validation failed",
      details: err?.fields,
    });
  }

  if (err instanceof AuthError) {
    console.warn(`Caught Auth Error for ${req.path}`, err.message);
    return res.status(401).json(err.toJSON());
  }

  if (err instanceof ApiError) {
    console.warn(`Caught Api Error for ${req.path}`, err.message, err.stack);
    return res.status(err.statusCode).json(err.toJSON());
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }

  next();
}
