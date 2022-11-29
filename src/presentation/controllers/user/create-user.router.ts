import { IOrmClient } from "@/infra/database/orm/interfaces";
import { Route } from "@/infra/http/router/route";
import { CreateUserControllerFactory } from "@/main/factories/controllers/user";
import { ICreateUserController } from "./create-user.controller";

export type CreateUserControllerRouterProps = {
  ormClient: IOrmClient;
};
export class CreateUserRoute extends Route {
  protected _controller!: ICreateUserController;
  static create({ ormClient }: CreateUserControllerRouterProps) {
    const controller =
      CreateUserControllerFactory.build(ormClient);
    return new CreateUserRoute({
      method: "POST",
      path: "user",
      controller,
      auth: 'bearer'
    });
  }
}
