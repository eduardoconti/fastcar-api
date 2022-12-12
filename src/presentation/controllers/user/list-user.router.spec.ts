import { ListUserOutput } from "@app/use-cases/user";
import { Result } from "@domain/contracts";
import { userModelMockData } from "@infra/database/models/mocks";
import { HttpRequest } from "@infra/http/interfaces";
import { RouterManager } from "@infra/http/router/router-manager";

import { IListUserController } from "./list-user.controller";
import { ListUserRoute } from "./list-user.router";


const makeListUserControllerStub =
  (): IListUserController => {
     class ListUserControllerStub
     implements IListUserController
     {
        handle(): Result<ListUserOutput[]> {
           return Result.ok([userModelMockData]);
        }
     }
     return new ListUserControllerStub();
  };

interface SutTypes {
   sut: ListUserRoute;
}

const makeSut = (): SutTypes => {
   const controller = makeListUserControllerStub();
   const sut = new ListUserRoute({
      method: "POST",
      path: "user",
      controller,
      auth: "bearer"
   });
   return {
      sut,
   };
};
describe("listUser router", () => {
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
