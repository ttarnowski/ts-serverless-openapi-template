import config from "config";
import { verify } from "jsonwebtoken";
import { AuthRequest } from "../../src/api/auth/AuthRequest";
import { request } from "../helpers/app";

const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    verify(token, config.get("authSecret"), function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });

describe("Auth", () => {
  describe("POST /auth", () => {
    it("responds with 200 status code and JWT token in the response body if request body is valid", async () => {
      const validRequestBody: AuthRequest = {
        type: "anonymous",
      };

      const response = await request.post("/auth").send(validRequestBody);

      expect(verifyToken(response.body.body)).toBeTruthy();
      expect(response.body.type).toEqual("jwt");
      expect(response.statusCode).toEqual(200);
    });
  });
});
