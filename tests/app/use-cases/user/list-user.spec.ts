
import { userModelMockData } from "@/../tests/infra/models/mocks"
import { User, UserProps } from "@/domain/entities"
import { ListUserUseCase, } from "@/app/use-cases/user"
import { IUserRepository, QueryParams } from "@/domain/contracts"
import { userEntityMock } from "@/../tests/domain/user/mocks"

const makeUserRepositoryStub = (): IUserRepository<User, UserProps> => {
  class MakeUserRepositoryStub implements IUserRepository<User, UserProps> {
    save(entity: User): Promise<User> {
      return Promise.resolve(userEntityMock)
    }
    findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
      return Promise.resolve(userEntityMock)
    }
    findMany(params?: QueryParams<UserProps>): Promise<User[] | undefined> {
      return Promise.resolve([userEntityMock])
    }
  }
  return new MakeUserRepositoryStub()
}

interface SutTypes {
  sut: ListUserUseCase
  userRepositoryStub: IUserRepository<User, UserProps>
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepositoryStub()
  const sut = new ListUserUseCase(
    userRepositoryStub,
  )
  return {
    sut,
    userRepositoryStub,
  }
}
describe('List user useCase', () => {
  it('should execute useCase', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findMany').mockResolvedValue([userEntityMock])

    const result = await sut.execute()

    expect(result.isSuccess).toBeTruthy()
    expect(userRepositoryStub.findMany).toBeCalledTimes(1)
    expect(result.getValue()).toEqual([{...userModelMockData, id: userEntityMock.id, password: undefined}])
  })

})