import { IListUserController } from "./list-user.controller";

import { IOrmClient } from "@/infra/database/orm/interfaces";
import { Route } from "@/infra/http/router/route";
import { ListUserControllerFactory } from "@/main/factories/controllers/user";

export type ListUserControllerRouterProps = {
   ormClient: IOrmClient;
};
export class ListUserRoute extends Route {
   protected _controller!: IListUserController;

   static create({ ormClient }: ListUserControllerRouterProps) {
      const controller = ListUserControllerFactory.build(ormClient);
      return new ListUserRoute({
         method: "GET",
         path: "user",
         controller,
         auth: "bearer",
      });
   }
}
