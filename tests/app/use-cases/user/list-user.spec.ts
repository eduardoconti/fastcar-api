
import { userModelMockData } from "@/../tests/infra/models/mocks"
import { User } from "@/domain/entities"
import { ListUserUseCase, } from "@/app/use-cases/user"
import { CreateParams, FindParams, IUserRepository } from "@/app/interfaces"

const makeUserRepositoryStub = (): IUserRepository => {
  class MakeUserRepositoryStub implements IUserRepository {
    create(params: CreateParams<User>): Promise<User> {
      return Promise.resolve({ id: 'fake', name: 'fakeName', login: 'fakeLogin', password: 'fakePassword' })
    }
    findUnique(params: FindParams<User>): Promise<User | undefined> {
      return Promise.resolve({ id: 'fake', name: 'fakeName', login: 'fakeLogin', password: 'fakePassword' })
    }
    find(findParams?: FindParams<User> | undefined): Promise<User[] | undefined> {
      return Promise.resolve([{ id: 'fake', name: 'fakeName', login: 'fakeLogin', password: 'fakePassword' }])
    }
  }
  return new MakeUserRepositoryStub()
}

interface SutTypes {
  sut: ListUserUseCase
  userRepositoryStub: IUserRepository
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
    jest.spyOn(userRepositoryStub, 'find').mockResolvedValue([{...userModelMockData}])

    const result = await sut.execute()

    expect(result.isSuccess).toBeTruthy()
    expect(userRepositoryStub.find).toBeCalledTimes(1)
    expect(result.getValue()).toEqual([{...userModelMockData, password: undefined}])
  })

})