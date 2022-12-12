import { HealthCheckController } from "@presentation/controllers/health";

export class HealthCheckControllerFactory {
   static create(): HealthCheckController {
      return new HealthCheckController();
   }
}
