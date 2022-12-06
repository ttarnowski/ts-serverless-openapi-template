import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "config";
import securities from "./securities";

export type Claims = { uuid: string };
export type AuthenticatedRequest = express.Request & { user: Claims };

export class AuthError extends Error {
  public type = "UNAUTHORIZED";

  constructor(message: string) {
    super(message);
  }

  toJSON() {
    return {
      type: this.type,
      message: this.message,
    };
  }
}

export const expressAuthentication = (
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<Claims> => {
  if (securityName === securities.USER_AUTH) {
    const token = removeBearerPrefix(request.headers["authorization"] || "");

    return new Promise((resolve, reject) => {
      if (!token || token === "") {
        return reject(new AuthError("no token provided"));
      }
      jwt.verify(token, config.get("authSecret"), function (err, decoded) {
        if (err) {
          reject(new AuthError(err.message));
        } else {
          resolve(decoded as Claims);
        }
      });
    });
  }

  return Promise.reject(new AuthError("security scheme check not implemented, check src/auth/middleware.ts"));
};

const removeBearerPrefix = (value: string) => value.slice(7);
