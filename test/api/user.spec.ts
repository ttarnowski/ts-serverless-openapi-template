import { v4 } from "uuid";
import { request } from "../helpers/app";
import { getAuthToken } from "../helpers/auth";

describe("Users", () => {
  describe("GET /user/me", () => {
    it("responds with 200 and uuid in the response body if auth token is valid", async () => {
      const uuid = v4();

      const response = await request.get(`/user/me`).set("Authorization", getAuthToken(uuid));

      expect(response.body).toEqual({ uuid });
      expect(response.statusCode).toEqual(200);
    });

    it("responds with 401 status code and unauthorized error message if auth token is invalid", async () => {
      const response = await request.get(`/user/me`);

      expect(response.body).toHaveProperty("type", "UNAUTHORIZED");
      expect(response.statusCode).toEqual(401);
    });
  });
});
