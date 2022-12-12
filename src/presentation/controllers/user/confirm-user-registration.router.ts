
import { IOrmClient } from "@infra/database/orm/interfaces";
import { Route } from "@infra/http/router/route";
import { ConfirmUserRegistrationControllerFactory } from "@main/factories/controllers/user";

import { IConfirmUserRegistrationController } from "./confirm-user-registration.controller";


export type ConfirmUserRegistrationControllerRouterProps = {
   ormClient: IOrmClient;
};
export class ConfirmUserRegistrationRoute extends Route {
   protected _controller!: IConfirmUserRegistrationController;

   static create({ ormClient }: ConfirmUserRegistrationControllerRouterProps) {
      const controller =
      ConfirmUserRegistrationControllerFactory.build(ormClient);
      return new ConfirmUserRegistrationRoute({
         method: "GET",
         path: "user/:id/confirm",
         controller,
      });
   }
}
