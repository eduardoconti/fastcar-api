import { IOrmClient } from "@/infra/database/orm/interfaces";
import { Route } from "@/infra/http/router/route";
import { AuthControllerFactory } from "@/main/factories/controllers/auth";
import { IAuthController } from "./auth.controller";

export type CreateAuthRouterProps = {
  ormClient: IOrmClient
}
export class AuthRouter extends Route {
  protected _controller!: IAuthController;
  static create({ ormClient }: CreateAuthRouterProps) {
    const controller = AuthControllerFactory.build(ormClient);
    return new AuthRouter({
      method: "POST",
      path: "auth",
      controller,
    });
  }
}
