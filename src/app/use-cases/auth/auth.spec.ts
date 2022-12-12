import { unauthorized } from "@app/errors/errors";
import { IEncrypter, IJwtService } from "@app/interfaces";
import { AuthUseCase } from "@app/use-cases/auth";
import { IUserRepository } from "@domain/contracts";
import { User } from "@domain/entities";
import { userEntityMock } from "@domain/entities/mocks";
import { authInputMock, authOutputMock } from "@presentation/controllers/mocks";

const makeJwtServiceStub = (): IJwtService => {
   class JwtServiceStub implements IJwtService {
      sign(): string {
         return "jwt token";
      }

      verify(): boolean {
         return true;
      }
   }
   return new JwtServiceStub();
};

const makeUserRepositoryStub = (): IUserRepository => {
   class MakeUserRepositoryStub implements IUserRepository {
      save(): Promise<User> {
         userEntityMock.confirmRegistration();
         return Promise.resolve(userEntityMock);
      }

      findOne(): Promise<User | undefined> {
         userEntityMock.confirmRegistration();
         return Promise.resolve(userEntityMock);
      }

      findMany(): Promise<User[] | undefined> {
         return Promise.resolve([userEntityMock]);
      }

      update(): Promise<User> {
         userEntityMock.confirmRegistration();
         return Promise.resolve(userEntityMock);
      }
   }
   return new MakeUserRepositoryStub();
};

const makeEncryptStub = (): IEncrypter => {
   class MakeEncryptStub implements IEncrypter {
      async hash(): Promise<string> {
         return Promise.resolve("hash");
      }

      async compare(): Promise<boolean> {
         return Promise.resolve(true);
      }
   }
   return new MakeEncryptStub();
};

interface SutTypes {
   sut: AuthUseCase;
   jwtServiceStub: IJwtService;
   userRepositoryStub: IUserRepository;
   encryptUseCaseStub: IEncrypter;
}

const makeSut = (): SutTypes => {
   const jwtServiceStub = makeJwtServiceStub();
   const userRepositoryStub = makeUserRepositoryStub();
   const encryptUseCaseStub = makeEncryptStub();
   const sut = new AuthUseCase(
      jwtServiceStub,
      userRepositoryStub,
      encryptUseCaseStub,
   );
   return {
      sut,
      jwtServiceStub,
      userRepositoryStub,
      encryptUseCaseStub,
   };
};
describe("Auth useCase", () => {
   it("should execute useCase", async () => {
      const { sut, jwtServiceStub, userRepositoryStub, encryptUseCaseStub } =
      makeSut();
      jest.spyOn(userRepositoryStub, "findOne");
      jest.spyOn(encryptUseCaseStub, "compare");
      jest.spyOn(jwtServiceStub, "sign");

      const result = await sut.execute(authInputMock);

      expect(result.isSuccess).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(jwtServiceStub.sign).toBeCalledTimes(1);
      expect(encryptUseCaseStub.compare).toBeCalledTimes(1);
      expect(result.getValue()).toEqual(authOutputMock);
   });

   it("should fail to execute useCase when not found user", async () => {
      const { sut, userRepositoryStub } = makeSut();
      jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(undefined);

      const result = await sut.execute(authInputMock);

      expect(result.isFailure).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(result.error).toEqual(unauthorized("Usuário não encontrado!"));
   });

   it("should fail to execute useCase when compare hash is failed", async () => {
      const { sut, userRepositoryStub, encryptUseCaseStub } = makeSut();
      jest.spyOn(userRepositoryStub, "findOne");
      jest.spyOn(encryptUseCaseStub, "compare").mockResolvedValue(false);

      const result = await sut.execute(authInputMock);

      expect(result.isFailure).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(result.error).toEqual(unauthorized("Falha de autenticação!"));
   });

   it("should fail to execute useCase when user is disabled", async () => {
      const { sut, userRepositoryStub, encryptUseCaseStub } = makeSut();
      userEntityMock.inactivateUser();

      jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(userEntityMock);
      jest.spyOn(encryptUseCaseStub, "compare").mockResolvedValue(true);

      const result = await sut.execute(authInputMock);

      expect(result.isFailure).toBeTruthy();
      expect(userRepositoryStub.findOne).toBeCalledTimes(1);
      expect(result.error).toEqual(
         unauthorized("Usuário com registro pendente de confirmação!"),
      );
   });
});
