import { Result } from "@domain/contracts";
import { Http } from "@infra/http/interfaces";
import { RouterManager } from "@infra/http/router/router-manager";

import {
   HealtCheckOutput,
   IHealthCheckController,
} from "./health-check.controller";
import { HealthCheckRouter } from "./health-check.router";


const makeHealthCheckControllerStub = (): IHealthCheckController => {
   class HealthCheckControllerStub implements IHealthCheckController {
      handle(): Result<HealtCheckOutput> {
         return Result.ok({
            description: "Fastcar",
            version: "1.0.0",
            env: "dev",
         });
      }
   }
   return new HealthCheckControllerStub();
};

interface SutTypes {
   sut: HealthCheckRouter;
}

const makeSut = (): SutTypes => {
   const controller = makeHealthCheckControllerStub();
   const sut = new HealthCheckRouter({
      method: "GET",
      path: "healt",
      controller,
   });
   return {
      sut,
   };
};
describe("healthCheck router", () => {
   beforeEach(() => {
      RouterManager.clearRoutes();
   });
   it("should shoud be defined", async () => {
      const { sut } = makeSut();
      expect(sut).toBeDefined();
   });
   it("should execute controller", async () => {
      const { sut } = makeSut();
      const result = await sut.handleController({
         pathName: "health",
      } as Http.Request);

      expect(result).toBeDefined();
      expect(result.isSuccess).toBeTruthy();
   });
});
