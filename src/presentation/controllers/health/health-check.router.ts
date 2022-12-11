import { IHealthCheckController } from "./health-check.controller";

import { Route } from "@/infra/http/router/route";
import { HealthCheckControllerFactory } from "@/main/factories/controllers/health";

export class HealthCheckRouter extends Route {
   protected _controller!: IHealthCheckController;

   static create() {
      const controller = HealthCheckControllerFactory.build();
      return new HealthCheckRouter({
         method: "GET",
         path: "health",
         controller,
      });
   }
}
