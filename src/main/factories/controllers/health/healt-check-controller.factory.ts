import { HealthCheckController } from "@/app/controllers/health";

export class HealthCheckControllerFactory {

  static build(): HealthCheckController {
    return new HealthCheckController()
  }
}