import { badRequest } from "@app/errors/errors";
import { IEncrypter } from "@app/interfaces";
import { CreateUserUseCase } from "@app/use-cases/user";
import { IUserRepository } from "@domain/contracts";
import { User } from "@domain/entities";
import { userEntityMock } from "@domain/entities/mocks";
import {
   createUserDtoMock,
   createUserOutputMock,
} from "@infra/database/models/mocks";

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

const makeEncryptStub = (): IEncrypter => {
   class MakeEncryptStub implements IEncrypter {
      async hash(): Promise<string> {
         return Promise.resolve("");
      }

      async compare(): Promise<boolean> {
         return Promise.resolve(true);
      }
   }
   return new MakeEncryptStub();
};

interface SutTypes {
   sut: CreateUserUseCase;
   userRepositoryStub: IUserRepository;
   encryptUseCaseStub: IEncrypter;
}

const makeSut = (): SutTypes => {
   const userRepositoryStub = makeUserRepositoryStub();
   const encryptUseCaseStub = makeEncryptStub();
   const sut = new CreateUserUseCase(userRepositoryStub, encryptUseCaseStub);
   return {
      sut,
      userRepositoryStub,
      encryptUseCaseStub,
   };
};
describe("Create user useCase", () => {
   it("should execute useCase", async () => {
      const { sut, userRepositoryStub, encryptUseCaseStub } = makeSut();

      jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(undefined);
      jest.spyOn(encryptUseCaseStub, "hash").mockResolvedValue("$%asdf/123");
      jest.spyOn(userRepositoryStub, "save").mockResolvedValue(userEntityMock);

      const result = await sut.execute(createUserDtoMock);

      expect(result.isSuccess).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(encryptUseCaseStub.hash).toBeCalledTimes(1);
      expect(userRepositoryStub.save).toBeCalledTimes(1);
      expect(result.getValue()?.login).toEqual(createUserOutputMock.login);
      expect(result.getValue()?.name).toEqual(createUserOutputMock.name);
   });

   it("should fail to execute useCase when login already exists", async () => {
      const { sut, userRepositoryStub } = makeSut();
      jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(userEntityMock);
      const result = await sut.execute(createUserDtoMock);

      expect(result.isFailure).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(result.error).toEqual(badRequest("This login belongs to a user"));
   });
});
