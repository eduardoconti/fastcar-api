
import { createUserDtoMock, createUserOutputMock, userModelMockData } from "@/../tests/infra/models/mocks"
import { Result, User } from "@/domain/entities"
import { CreateParams, FindParams, IEncrypter, IUseCase, IUserRepository, IUuid } from "@/domain/interfaces"
import { CreateUserUseCase } from "@/app/use-cases/user"
import { EncryptUseCase } from "../encrypt"
import { UuidUseCase } from "../uuid"

const makeUuiduseCaseStub = (): UuidUseCase => {
  class UuidUseCaseStub implements IUseCase<undefined, string> {
    constructor(
      readonly uuidGenerator: IUuid
    ) {
    }
    execute(): string {
      return this.uuidGenerator.v4()
    }
  }
  class UuidGeneratorStub implements IUuid {
    v4(): string {
      return ''
    }
  }
  return new UuidUseCaseStub(new UuidGeneratorStub())
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

const makeEncryptUseCaseStub = (): EncryptUseCase => {
  class MakeEncryptUseCaseStub implements IUseCase<string, Result<string>> {
    constructor(
      readonly encrypter: IEncrypter
    ) {

    }
    async execute(word: string): Promise<Result<string>> {
      return Result.ok('asdf!@#')
    }
  }

  class MakeEncryptStub implements IEncrypter {
    async hash(text: string, salt: number): Promise<string> {
      return Promise.resolve('')
    }
    async compare(text: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new MakeEncryptUseCaseStub(new MakeEncryptStub())
}

interface SutTypes {
  sut: CreateUserUseCase
  uuidUseCaseStub: UuidUseCase
  userRepositoryStub: IUserRepository
  encryptUseCaseStub: EncryptUseCase
}

const makeSut = (): SutTypes => {
  const uuidUseCaseStub = makeUuiduseCaseStub()
  const userRepositoryStub = makeUserRepositoryStub()
  const encryptUseCaseStub = makeEncryptUseCaseStub()
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
    jest.spyOn(uuidUseCaseStub, 'execute').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    jest.spyOn(encryptUseCaseStub, 'execute').mockResolvedValue(Result.ok('$%asdf/123'))
    jest.spyOn(userRepositoryStub, 'create').mockResolvedValue(userModelMockData)

    const result = await sut.execute(createUserDtoMock)

    expect(result.isSuccess).toBeTruthy()
    expect(uuidUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(encryptUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.create).toBeCalledTimes(1)
    expect(result.getValue()).toEqual(createUserOutputMock)
  })

  it('should fail to execute useCase when login already exists', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'execute').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(userModelMockData)
    const result = await sut.execute(createUserDtoMock)

    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 400, title: 'Bad Request', detail: 'This login belongs to a user' })
  })

  it('should fail to execute useCase when confirmPassword is null', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'execute').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: null } as any)
    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 400, title: 'Bad Request', detail: 'confirmPassword should be not empty' })
  })

  it('should fail to execute useCase when passwords do not match', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'execute').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: 'lalala' } as any)
    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 400, title: 'Bad Request', detail: 'As senhas não coincidem' })
  })

  it('should fail to execute useCase when passwords not encrypted', async () => {
    const { sut, userRepositoryStub, uuidUseCaseStub, encryptUseCaseStub } = makeSut()
    jest.spyOn(uuidUseCaseStub, 'execute').mockReturnValue('fakeUuid')
    jest.spyOn(userRepositoryStub, 'findUnique').mockResolvedValue(undefined)
    jest.spyOn(encryptUseCaseStub, 'execute').mockResolvedValue(Result.fail({ status: 500 }))
    const result = await sut.execute(createUserDtoMock)
    expect(result.isFailure).toBeTruthy()
    expect(uuidUseCaseStub.execute).toBeCalledTimes(1)
    expect(userRepositoryStub.findUnique).toBeCalledTimes(1)
    expect(result.error).toEqual({ status: 500 })
  })
})