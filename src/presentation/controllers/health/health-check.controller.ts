import { IController } from "@/app/interfaces";
import { Result } from "@/domain/contracts";

type HealtCheck = {
  description: string,
  version: string,
  env: string,
}
export class HealthCheckController implements IController<HealtCheck> {

  constructor() {
  }
  handle(): Result<HealtCheck> {
    return Result.ok({
      description: 'Fastcar',
      version: '1.0.0',
      env: process.env.NODE_ENV as string
    })
  }
}