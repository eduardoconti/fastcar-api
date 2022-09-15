
import { createUserDtoMock, userModelMockData } from "@/../tests/infra/models/mocks"
import { CreateParams, FindParams, IRepository } from "@/domain/interfaces"
import { UserModel } from "@/infra/models"
import { UserRepository } from "@/app/use-cases/user"
import { User } from "@/domain/entities"

const makeRepositoryStub = (): IRepository<UserModel> => {
  class RepositoryStub implements IRepository<UserModel> {
    findUnique(findParams: FindParams<UserModel>): Promise<UserModel> {
      return Promise.resolve(userModelMockData)
    }
    create(createParams: CreateParams<UserModel>) {
      return Promise.resolve(userModelMockData)
    }
  }
  return new RepositoryStub()
}

interface SutTypes {
  sut: UserRepository
  repositoryStub: IRepository<UserModel>
}

const makeSut = (): SutTypes => {
  const repositoryStub = makeRepositoryStub()
  const sut = new UserRepository(
    repositoryStub,
  )
  return {
    sut,
    repositoryStub
  }
}
describe('User Repository useCase', () => {
  it('should execute add', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'create').mockResolvedValue(userModelMockData)
    const result = await sut.add(User.build(createUserDtoMock))
    expect(result).toBeDefined()
    expect(repositoryStub.create).toBeCalledTimes(1)
    expect(result).toEqual(userModelMockData)
  })

  it('should execute findOne', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'findUnique').mockResolvedValue(userModelMockData)
    const result = await sut.findOne(createUserDtoMock)
    expect(result).toBeDefined()
    expect(repositoryStub.findUnique).toBeCalledTimes(1)
    expect(result).toEqual(userModelMockData)
  })
})