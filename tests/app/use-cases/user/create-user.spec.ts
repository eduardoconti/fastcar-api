
import { createUserDtoMock, userModelMockData } from "@/../tests/infra/models/mocks"
import { User } from "@/domain/entities"
import { CreateUser, FindUserParams, IUserRepository } from "@/domain/use-cases/user"
import { IUuid } from "@/domain/use-cases/uuid"
import { UserModel } from "@/infra/models"

const makeUuidGeneratorStub = (): IUuid => {
  class UuidGeneratorStub implements IUuid {
    uuidV4(): string {
      return ''
    }
  }
  return new UuidGeneratorStub()
}

const makeUserRepositoryStub = (): IUserRepository => {
  class MakeUserRepositoryStub implements IUserRepository {
    add(user: User): Promise<UserModel> {
      return Promise.resolve({ id: 'fake', name: 'fakeName', login: 'fakeLogin', password: 'fakePassword' })
    }
    findOne(params: FindUserParams): Promise<UserModel> {
      return Promise.resolve({ id: 'fake', name: 'fakeName', login: 'fakeLogin', password: 'fakePassword' })
    }
  }
  return new MakeUserRepositoryStub()
}

interface SutTypes {
  sut: CreateUser
  uuidGeneratorStub: IUuid
  userRepositoryStub: IUserRepository
}

const makeSut = (): SutTypes => {
  const uuidGeneratorStub = makeUuidGeneratorStub()
  const userRepositoryStub = makeUserRepositoryStub()
  const sut = new CreateUser(
    uuidGeneratorStub,
    userRepositoryStub
  )
  return {
    sut,
    uuidGeneratorStub,
    userRepositoryStub,
  }
}
describe('Create user useCase', () => {
  it('should execute useCase', async () => {
    const { sut, uuidGeneratorStub, userRepositoryStub } = makeSut()
    jest.spyOn(uuidGeneratorStub, 'uuidV4').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'add').mockResolvedValue(userModelMockData)
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)
    const result = await sut.create(createUserDtoMock)
    expect(result.isSuccess).toBeTruthy()
    expect(uuidGeneratorStub.uuidV4).toBeCalledTimes(1)
    expect(userRepositoryStub.add).toBeCalledTimes(1)
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.getValue()).toEqual(userModelMockData)
  })

  it('should fail to execute useCase when login already exists', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(userModelMockData)
    const result = await sut.create(createUserDtoMock)

    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 400, title: 'Bad Request', detail: 'This login belongs to a user' })
  })

  it('should fail to execute useCase when confirmPassword is null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)
    const result = await sut.create({...createUserDtoMock, confirmPassword: null} as any)
    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 400, title: 'Bad Request', detail: 'confirmPassword should be not empty' })
  })
})