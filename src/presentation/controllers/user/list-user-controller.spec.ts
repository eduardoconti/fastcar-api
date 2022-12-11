import { ListUserController } from "./list-user.controller";

import {
   CreateUserInputDTO,
   IListUserUseCase,
   ListUser,
} from "@/app/use-cases/user";
import { Result } from "@/domain/contracts";
import { userModelMockData } from "@/infra/database/models/mocks";

const makeListUserUseCaseStub = (): IListUserUseCase => {
   class CreateUserUseCaseStub implements IListUserUseCase {
      async execute(
         user: CreateUserInputDTO,
      ): Promise<Result<ListUser.Output[]>> {
         return Result.ok([userModelMockData]);
      }
   }
   return new CreateUserUseCaseStub();
};

interface SutTypes {
   sut: ListUserController;
   listUserUseCaseStub: IListUserUseCase;
}

const makeSut = (): SutTypes => {
   const listUserUseCaseStub = makeListUserUseCaseStub();
   const sut = new ListUserController(listUserUseCaseStub);
   return {
      sut,
      listUserUseCaseStub,
   };
};
describe("List user controller", () => {
   it("should execute controller", async () => {
      const { sut, listUserUseCaseStub } = makeSut();
      jest
         .spyOn(listUserUseCaseStub, "execute")
         .mockReturnValue(Result.ok([userModelMockData]));

      const result = await sut.handle();

      expect(result.isSuccess).toBeTruthy();
      expect(listUserUseCaseStub.execute).toBeCalledTimes(1);
      expect(result.getValue()).toBeDefined();
   });
});
