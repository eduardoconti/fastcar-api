import { CreateUserOutput } from "@app/use-cases/user";
import { Result } from "@domain/contracts";
import { HttpRequest } from "@infra/http/interfaces";
import { RouterManager } from "@infra/http/router/router-manager";

import { ICreateUserController } from "./create-user.controller";
import { CreateUserRoute } from "./create-user.router";

const makeCreateUserControllerStub =
  (): ICreateUserController => {
     class CreateUserControllerStub
     implements ICreateUserController
     {
        handle(): Result<CreateUserOutput> {
           return Result.ok();
        }
     }
     return new CreateUserControllerStub();
  };

interface SutTypes {
   sut: CreateUserRoute;
}

const makeSut = (): SutTypes => {
   const controller = makeCreateUserControllerStub();
   const sut = new CreateUserRoute({
      method: "POST",
      path: "user",
      controller,
      auth: "bearer"
   });
   return {
      sut,
   };
};
describe("createUser router", () => {
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
      } as HttpRequest);

      expect(result).toBeDefined();
      expect(result.isSuccess).toBeTruthy();
   });
});
