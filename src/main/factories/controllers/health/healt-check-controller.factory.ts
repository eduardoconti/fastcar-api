import { HealthCheckController } from "@presentation/controllers/health";

export class HealthCheckControllerFactory {
   static build(): HealthCheckController {
      return new HealthCheckController();
   }
}
