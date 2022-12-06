import { Controller, Get, Request, Route, Security } from "tsoa";
import { AuthenticatedRequest } from "../auth/middleware";
import { provideSingleton } from "../../util/provideSingleton";
import { User } from "./User";
import securities from "../auth/securities";

@Route("user")
@provideSingleton(UsersController)
export class UsersController extends Controller {
  @Security(securities.USER_AUTH)
  @Get("me")
  public getUser(@Request() { user }: AuthenticatedRequest): User {
    return {
      uuid: user.uuid,
    };
  }
}
