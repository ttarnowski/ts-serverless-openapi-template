import config from "config";
import { AuthRequest } from "./AuthRequest";
import { AuthToken } from "./AuthToken";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { provide } from "inversify-binding-decorators";

@provide(AuthService)
export class AuthService {
  public authenticate(authReq: AuthRequest): AuthToken {
    const uuid = v4();

    const token = sign({ uuid }, config.get("authSecret"));

    return {
      type: "jwt",
      body: token,
    };
  }
}
