import { IOrmClient } from "@infra/database/orm/interfaces";
import { Route } from "@infra/http/router/route";
import { ValidateBodyMiddleware } from "@infra/http/router/validate-body.middleware";
import { CreateUserControllerFactory } from "@main/factories/controllers/user";

import { ICreateUserController } from "./create-user.controller";
import { CreateUserControllerInput } from "./create-user.controller.dto";

export type CreateUserControllerRouterProps = {
   ormClient: IOrmClient;
};
export class CreateUserRoute extends Route {
   protected _controller!: ICreateUserController;

   static create({ ormClient }: CreateUserControllerRouterProps) {
      const controller = CreateUserControllerFactory.create(ormClient);
      return new CreateUserRoute({
         method: "POST",
         path: "user",
         controller,
         auth: "bearer",
         middlewares: [new ValidateBodyMiddleware(CreateUserControllerInput)],
      });
   }
}
