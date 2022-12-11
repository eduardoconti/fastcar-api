import { IConfirmUserRegistrationController } from "./confirm-user-registration.controller";
import { ConfirmUserRegistrationRoute } from "./confirm-user-registration.router";

import { ConfirmUserRegistrationOutputDTO } from "@/app/use-cases/user";
import { Result } from "@/domain/contracts";
import { Http } from "@/infra/http/interfaces";
import { RouterManager } from "@/infra/http/router/router-manager";

const makeConfirmUserRegistrationControllerStub =
  (): IConfirmUserRegistrationController => {
     class ConfirmUserRegistrationControllerStub
     implements IConfirmUserRegistrationController
     {
        handle(): Result<ConfirmUserRegistrationOutputDTO> {
           return Result.ok();
        }
     }
     return new ConfirmUserRegistrationControllerStub();
  };

interface SutTypes {
   sut: ConfirmUserRegistrationRoute;
}

const makeSut = (): SutTypes => {
   const controller = makeConfirmUserRegistrationControllerStub();
   const sut = new ConfirmUserRegistrationRoute({
      method: "GET",
      path: "user/:id/confirm",
      controller,
   });
   return {
      sut,
   };
};
describe("confirmUserRegistration router", () => {
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
