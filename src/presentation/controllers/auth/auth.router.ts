
import { IOrmClient } from "@infra/database/orm/interfaces";
import { ValidateBodyMiddleware, Route } from "@infra/http/router";
import { AuthControllerFactory } from "@main/factories/controllers/auth";

import { AuthControllerInput, IAuthController } from ".";

export type CreateAuthRouterProps = {
   ormClient: IOrmClient;
};
export class AuthRouter extends Route {
   protected _controller!: IAuthController;

   static create({ ormClient }: CreateAuthRouterProps) {
      const controller = AuthControllerFactory.build(ormClient);
      return new AuthRouter({
         method: "POST",
         path: "auth",
         controller,
         middlewares: [new ValidateBodyMiddleware(AuthControllerInput)],
      });
   }
}
