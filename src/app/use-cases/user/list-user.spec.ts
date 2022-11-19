import { User, UserProps } from "@/domain/entities";
import { ListUserUseCase } from "@/app/use-cases/user";
import { QueryParams } from "@/domain/contracts";
import { IUserRepository } from "@/app/interfaces";
import { userEntityMock } from "@/domain/entities/mocks";
import { userModelMockData } from "@/infra/database/models/mocks";

const makeUserRepositoryStub = (): IUserRepository => {
  class MakeUserRepositoryStub implements IUserRepository {
    save(entity: User): Promise<User> {
      return Promise.resolve(userEntityMock);
    }
    findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
      return Promise.resolve(userEntityMock);
    }
    findMany(params?: QueryParams<UserProps>): Promise<User[] | undefined> {
      return Promise.resolve([userEntityMock]);
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
