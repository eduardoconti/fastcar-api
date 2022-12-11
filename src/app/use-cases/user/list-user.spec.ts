import { ListUserUseCase } from "@/app/use-cases/user";
import { IUserRepository } from "@/domain/contracts";
import { User } from "@/domain/entities";
import { userEntityMock } from "@/domain/entities/mocks";

const makeUserRepositoryStub = (): IUserRepository => {
   class MakeUserRepositoryStub implements IUserRepository {
      save(): Promise<User> {
         return Promise.resolve(userEntityMock);
      }

      findOne(): Promise<User | undefined> {
         return Promise.resolve(userEntityMock);
      }

      findMany(): Promise<User[] | undefined> {
         return Promise.resolve([userEntityMock]);
      }

      update(): Promise<User> {
         return Promise.resolve(userEntityMock);
      }
   }
   return new MakeUserRepositoryStub();
};

interface SutTypes {
   sut: ListUserUseCase;
   userRepositoryStub: IUserRepository;
}

const makeSut = (): SutTypes => {
   const userRepositoryStub = makeUserRepositoryStub();
   const sut = new ListUserUseCase(userRepositoryStub);
   return {
      sut,
      userRepositoryStub,
   };
};
describe("List user useCase", () => {
   it("should execute useCase", async () => {
      const { sut, userRepositoryStub } = makeSut();
      jest
         .spyOn(userRepositoryStub, "findMany")
         .mockResolvedValue([userEntityMock]);

      const result = await sut.execute();

      expect(result.isSuccess).toBeTruthy();
      expect(userRepositoryStub.findMany).toBeCalledTimes(1);
      expect(result.getValue()).toEqual([
         {
            name: userEntityMock.props.name.value,
            id: userEntityMock.id.value,
            login: userEntityMock.props.login.value,
         },
      ]);
   });
});
