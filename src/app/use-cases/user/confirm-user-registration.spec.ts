import { User, UserProps } from "@/domain/entities";
import { ConfirmUserRegistrationUseCase } from "@/app/use-cases/user";
import { badRequest } from "@/app/errors/errors";
import { IUserRepository, QueryParams } from "@/domain/contracts";
import { userEntityMock } from "@/domain/entities/mocks";
import { DateVO, UUID } from "@/domain/value-objects";
import {
  Email,
  Name,
  Password,
  UserStatus,
  UserStatusEnum,
} from "@/domain/value-objects/user";

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
    update(entity: User): Promise<User> {
      return Promise.resolve(userEntityMock);
    }
  }
  return new MakeUserRepositoryStub();
};

interface SutTypes {
  sut: ConfirmUserRegistrationUseCase;
  userRepositoryStub: IUserRepository;
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepositoryStub();
  const sut = new ConfirmUserRegistrationUseCase(userRepositoryStub);
  return {
    sut,
    userRepositoryStub,
  };
};
describe("Create user useCase", () => {
  it("should execute useCase", async () => {
    const { sut, userRepositoryStub } = makeSut();

    jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(userEntityMock);
    jest.spyOn(userRepositoryStub, "update").mockResolvedValue(userEntityMock);

    const result = await sut.execute({ id: userEntityMock.id.value });

    expect(result.isSuccess).toBeTruthy();
    expect(userRepositoryStub.findOne).toBeCalledTimes(1);
    expect(userRepositoryStub.update).toBeCalledTimes(1);
    expect(userRepositoryStub.update).toBeCalledWith(
      expect.objectContaining({
        _id: expect.any(UUID),
        _createdAt: expect.any(DateVO),
        _updatedAt: expect.any(DateVO),
        _domainEvents: [],
        props: {
          login: expect.any(Email),
          name: new Name(userEntityMock.props.name.value),
          password: expect.any(Password),
          status: new UserStatus(UserStatusEnum.ACTIVATED),
        },
      })
    );
  });

  it("should fail to execute useCase when user not found", async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, "findOne").mockResolvedValue(undefined);
    const result = await sut.execute({ id: userEntityMock.id.value });

    expect(result.isFailure).toBeTruthy();
    expect(userRepositoryStub.findOne).toBeCalledTimes(1);
    expect(result.error).toEqual(badRequest("user not found"));
  });
});
