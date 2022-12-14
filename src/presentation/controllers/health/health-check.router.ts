import { Route } from "@infra/http/router/route";
import { HealthCheckControllerFactory } from "@main/factories/controllers/health";

import { IHealthCheckController } from "./health-check.controller";

export class HealthCheckRouter extends Route {
   protected _controller!: IHealthCheckController;

   static create() {
      const controller = HealthCheckControllerFactory.create();
      return new HealthCheckRouter({
         method: "GET",
         path: "health",
         controller,
      });
   }
}
