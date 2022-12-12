import { AuthUseCase, IAuthUseCase } from "@app/use-cases/auth";
import { Result } from "@domain/contracts";

import { authInputMock, authOutputMock } from "../mocks";

import { AuthController } from "./auth.controller";


const makeAuthUseCaseStub = (): IAuthUseCase => {
   class AuthUseCaseStub implements IAuthUseCase {
      async execute(): Promise<Result<AuthUseCase.Output>> {
         return Result.ok(authOutputMock);
      }
   }
   return new AuthUseCaseStub();
};

interface SutTypes {
   sut: AuthController;
   listAuthUseCaseStub: IAuthUseCase;
}

const makeSut = (): SutTypes => {
   const listAuthUseCaseStub = makeAuthUseCaseStub();
   const sut = new AuthController(listAuthUseCaseStub);
   return {
      sut,
      listAuthUseCaseStub,
   };
};
describe("auth controller", () => {
   it("should execute controller", async () => {
      const { sut, listAuthUseCaseStub } = makeSut();
      jest
         .spyOn(listAuthUseCaseStub, "execute")
         .mockReturnValue(Result.ok(authOutputMock));

      const result = await sut.handle({ body: authInputMock });

      expect(result.isSuccess).toBeTruthy();
      expect(listAuthUseCaseStub.execute).toBeCalledTimes(1);
      expect(result.getValue()).toBeDefined();
   });
});
