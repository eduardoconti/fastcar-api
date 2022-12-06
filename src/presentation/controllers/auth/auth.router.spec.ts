import { AuthUseCase, IAuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/contracts";
import { Http } from "@/infra/http/interfaces";
import { RouterManager } from "@/infra/http/router/router-manager";
import { authInputMock, authOutputMock } from "../mocks";
import { AuthControllerInput, IAuthController } from "./auth.controller";
import { AuthRouter } from "./auth.router";

const makeAuthControllerStub = (): IAuthController => {
  class AuthControllerStub implements IAuthController {
    async handle(
      input: AuthControllerInput
    ): Promise<Result<AuthUseCase.Output>> {
      return Result.ok(authOutputMock);
    }
  }
  return new AuthControllerStub();
};

interface SutTypes {
  sut: AuthRouter;
}

const makeSut = (): SutTypes => {
  const controller = makeAuthControllerStub();
  const sut = new AuthRouter({
    method: "POST",
    path: "auth",
    controller,
  });
  return {
    sut,
  };
};
describe("auth router", () => {
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
      body: authInputMock,
      pathName: "auth",
    } as Http.Request);

    expect(result).toBeDefined()
    expect(result.isSuccess).toBeTruthy()
  });
});
