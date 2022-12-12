import { IOrmClient } from "@infra/database/orm/interfaces";
import { Route } from "@infra/http/router/route";
import { ListUserControllerFactory } from "@main/factories/controllers/user";

import { IListUserController } from "./list-user.controller";

export type ListUserControllerRouterProps = {
   ormClient: IOrmClient;
};
export class ListUserRoute extends Route {
   protected _controller!: IListUserController;

   static create({ ormClient }: ListUserControllerRouterProps) {
      const controller = ListUserControllerFactory.create(ormClient);
      return new ListUserRoute({
         method: "GET",
         path: "user",
         controller,
         auth: "bearer",
      });
   }
}
