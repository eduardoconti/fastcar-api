import { IController } from "@/app/interfaces";
import { Result } from "@/domain/contracts";

export type HealtCheckOutput = {
   description: string;
   version: string;
   env: string;
};

export type IHealthCheckController = IController<HealtCheckOutput>;
export class HealthCheckController implements IHealthCheckController {

   handle(): Result<HealtCheckOutput> {
      return Result.ok({
         description: "Fastcar",
         version: "1.0.0",
         env: process.env.NODE_ENV as string,
      });
   }
}
