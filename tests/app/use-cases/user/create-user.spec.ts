
import { createUserDtoMock, createUserOutputMock } from "@/../tests/infra/models/mocks"
import { User, UserProps } from "@/domain/entities"
import { CreateUserUseCase } from "@/app/use-cases/user"
import { IEncrypter, IUserRepository } from "@/app/interfaces"
import { badRequest } from "@/app/errors/errors"
import { QueryParams } from "@/domain/contracts"
import { userEntityMock } from "@/../tests/domain/user/mocks"


const makeUserRepositoryStub = (): IUserRepository => {
  class MakeUserRepositoryStub implements IUserRepository {
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
  userRepositoryStub: IUserRepository
  encryptUseCaseStub: IEncrypter
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeUserRepositoryStub()
  const encryptUseCaseStub = makeEncryptStub()
  const sut = new CreateUserUseCase(
    userRepositoryStub,
    encryptUseCaseStub
  )
  return {
    sut,
    userRepositoryStub,
    encryptUseCaseStub
  }
}
describe('Create user useCase', () => {
  it('should execute useCase', async () => {
    const { sut, userRepositoryStub, encryptUseCaseStub } = makeSut()

    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)
    jest.spyOn(encryptUseCaseStub, 'hash').mockResolvedValue('$%asdf/123')
    jest.spyOn(userRepositoryStub, 'save').mockResolvedValue(userEntityMock)

    const result = await sut.execute(createUserDtoMock)

    expect(result.isSuccess).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(encryptUseCaseStub.hash).toBeCalledTimes(1)
    expect(userRepositoryStub.save).toBeCalledTimes(1)
    expect(result.getValue()?.login).toEqual(createUserOutputMock.login)
    expect(result.getValue()?.name).toEqual(createUserOutputMock.name)
  })

  it('should fail to execute useCase when login already exists', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(userEntityMock)
    const result = await sut.execute(createUserDtoMock)

    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual(badRequest('This login belongs to a user'))
  })

  it('should fail to execute useCase when confirmPassword is null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: null } as any)
    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).not.toBeCalled()
    expect(result.error).toEqual(badRequest('confirmPassword should be not empty'))
  })

  it('should fail to execute useCase when passwords do not match', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)
    const result = await sut.execute({ ...createUserDtoMock, confirmPassword: 'lalala' } as any)
    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual(badRequest('As senhas não coincidem'))
  })
})