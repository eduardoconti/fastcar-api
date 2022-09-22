
import { createUserDtoMock, createUserOutputMock, userModelMockData } from "@/../tests/infra/models/mocks"
import { User } from "@/domain/entities"
import { CreateUserUseCase } from "@/app/use-cases/user"
import { CreateParams, FindParams, IEncrypter, IUserRepository, IUuid } from "@/app/interfaces"
import { badRequest } from "@/app/errors/errors"



const makeUuidStub = (): IUuid => {
  class UuidGeneratorStub implements IUuid {
    v4(): string {
      return 'fakeUuid'
    }
  }
  return new UuidGeneratorStub()
}

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

const makeEncryptStub = (): IEncrypter => {

  class MakeEncryptStub implements IEncrypter {
    async hash(text: string, salt: number): Promise<string> {
      return Promise.resolve('')
    }
    async compare(text: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new MakeEncryptStub()
}

interface SutTypes {
  sut: CreateUserUseCase
  uuidUseCaseStub: IUuid
  userRepositoryStub: IUserRepository
  encryptUseCaseStub: IEncrypter
}

const makeSut = (): SutTypes => {
  const uuidUseCaseStub = makeUuidStub()
  const userRepositoryStub = makeUserRepositoryStub()
  const encryptUseCaseStub = makeEncryptStub()
  const sut = new CreateUserUseCase(
    uuidUseCaseStub,
    userRepositoryStub,
    encryptUseCaseStub
  )
  return {
    sut,
    uuidUseCaseStub,
    userRepositoryStub,
    encryptUseCaseStub
  }
}
describe('Create user useCase', () => {
  it('should execute useCase', async () => {
    const { sut, uuidUseCaseStub, userRepositoryStub, encryptUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'v4').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    jest.spyOn(encryptUseCaseStub, 'hash').mockResolvedValue('$%asdf/123')
    jest.spyOn(userRepositoryStub, 'create').mockResolvedValue(userModelMockData)

    const result = await sut.execute(createUserDtoMock)

    expect(result.isSuccess).toBeTruthy()
    expect(uuidUseCaseStub.v4).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(encryptUseCaseStub.hash).toBeCalledTimes(1)
    expect(userRepositoryStub.create).toBeCalledTimes(1)
    expect(result.getValue()).toEqual(createUserOutputMock)
  })

  it('should fail to execute useCase when login already exists', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'v4').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(userModelMockData)
    const result = await sut.execute(createUserDtoMock)

    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.v4).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual(badRequest('This login belongs to a user'))
  })

  it('should fail to execute useCase when confirmPassword is null', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'v4').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: null } as any)
    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.v4).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual(badRequest('confirmPassword should be not empty'))
  })

  it('should fail to execute useCase when passwords do not match', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'v4').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: 'lalala' } as any)
    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.v4).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual(badRequest('As senhas não coincidem'))
  })
})