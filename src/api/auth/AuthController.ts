import { inject } from "inversify";
import { Body, Controller, Post, Route } from "tsoa";
import { provideSingleton } from "../../util/provideSingleton";
import { AuthRequest } from "./AuthRequest";
import { AuthService } from "./AuthService";
import { AuthToken } from "./AuthToken";

@Route("auth")
@provideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(AuthService) private authService: AuthService) {
    super();
  }

  @Post()
  public async authenticate(@Body() requestBody: AuthRequest): Promise<AuthToken> {
    return this.authService.authenticate(requestBody);
  }
}
