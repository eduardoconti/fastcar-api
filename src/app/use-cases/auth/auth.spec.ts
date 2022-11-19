import { User, UserProps } from "@/domain/entities"
import { AuthUseCase } from "@/app/use-cases/auth"
import {IEncrypter, IJwtService, IUserRepository } from "@/app/interfaces"
import { badRequest, unauthorized } from "@/app/errors/errors"
import { QueryParams } from "@/domain/contracts"
import { userEntityMock } from "@/domain/entities/mocks"
import { authInputMock, authOutputMock } from "@/presentation/controllers/mocks"

const makeJwtServiceStub = (): IJwtService => {
  class JwtServiceStub implements IJwtService {
    sign<T = any>(payload: T): string {
      return 'jwt token'
    }
    verify(token: string): boolean {
      return true
    }
  }
  return new JwtServiceStub()
}

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
      return Promise.resolve('hash')
    }
    async compare(text: string, compare: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new MakeEncryptStub()
}

interface SutTypes {
  sut: AuthUseCase
  jwtServiceStub: IJwtService
  userRepositoryStub: IUserRepository
  encryptUseCaseStub: IEncrypter
}

const makeSut = (): SutTypes => {
  const jwtServiceStub = makeJwtServiceStub()
  const userRepositoryStub = makeUserRepositoryStub()
  const encryptUseCaseStub = makeEncryptStub()
  const sut = new AuthUseCase(
    jwtServiceStub,
    userRepositoryStub,
    encryptUseCaseStub
  )
  return {
    sut,
    jwtServiceStub,
    userRepositoryStub,
    encryptUseCaseStub
  }
}
describe('Auth useCase', () => {
  it('should execute useCase', async () => {
    const { sut, jwtServiceStub, userRepositoryStub, encryptUseCaseStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne')
    jest.spyOn(encryptUseCaseStub, 'compare')
    jest.spyOn(jwtServiceStub, 'sign')

    const result = await sut.execute(authInputMock)

    expect(result.isSuccess).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(jwtServiceStub.sign).toBeCalledTimes(1)
    expect(encryptUseCaseStub.compare).toBeCalledTimes(1)
    expect(result.getValue()).toEqual(authOutputMock)
  })

  it('should fail to execute useCase when login is null', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ ...authInputMock, login: undefined } as any)

    expect(result.isFailure).toBeTruthy()
    expect(result.error).toEqual(badRequest('o campo login é obrigatório!'))
  })

  it('should fail to execute useCase when password is null', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ ...authInputMock, password: undefined } as any)

    expect(result.isFailure).toBeTruthy()
    expect(result.error).toEqual(badRequest('o campo password é obrigatório!'))
  })

  it('should fail to execute useCase when not found user', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne').mockResolvedValue(undefined)

    const result = await sut.execute(authInputMock)

    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual(unauthorized('Usuário não encontrado!'))
  })

  it('should fail to execute useCase when compare hash is failed', async () => {
    const { sut, userRepositoryStub, encryptUseCaseStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findOne')
    jest.spyOn(encryptUseCaseStub, 'compare').mockResolvedValue(false)

    const result = await sut.execute(authInputMock)

    expect(result.isFailure).toBeTruthy()
    expect(userRepositoryStub.findOne).toBeCalledTimes(1)
    expect(result.error).toEqual(unauthorized('Falha de autenticação!'))
  })

})