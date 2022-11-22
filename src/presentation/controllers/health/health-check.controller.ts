import { IController } from "@/app/interfaces";
import { Result } from "@/domain/contracts";

type HealtCheck = {
  description: string;
  version: string;
  env: string;
};

export type IHealthCheckController = IController<HealtCheck>;
export class HealthCheckController implements IHealthCheckController {
  constructor() {}
  handle(): Result<HealtCheck> {
    return Result.ok({
      description: "Fastcar",
      version: "1.0.0",
      env: process.env.NODE_ENV as string,
    });
  }
}
