
import { createUserDtoMock, userModelMockData } from "@/../tests/infra/models/mocks"
import { Result } from "@/domain/contracts"
import { CreateUserInputDTO, CreateUserOutputDTO, ICreateUserUseCase } from "@/app/use-cases/user"
import { CreateUserController } from "@/app/controllers/user"


const makeCreateUserUseCaseStub = (): ICreateUserUseCase => {
  class CreateUserUseCaseStub implements ICreateUserUseCase {
    async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {
      return Result.ok({
        id: '',
        name: '',
        login: ''
      })
    }
  }
  return new CreateUserUseCaseStub()
}

interface SutTypes {
  sut: CreateUserController
  createUserUseCaseStub: ICreateUserUseCase
}

const makeSut = (): SutTypes => {
  const createUserUseCaseStub = makeCreateUserUseCaseStub()
  const sut = new CreateUserController(
    createUserUseCaseStub
  )
  return {
    sut,
    createUserUseCaseStub,
  }
}
describe('Create user controller', () => {
  it('should execute controller', async () => {
    const { sut, createUserUseCaseStub } = makeSut()
    jest.spyOn(createUserUseCaseStub, 'execute').mockReturnValue(Result.ok(userModelMockData))

    const result = await sut.handle({ body: createUserDtoMock })

    expect(result.isSuccess).toBeTruthy()
    expect(createUserUseCaseStub.execute).toBeCalledTimes(1)
    expect(result.getValue()).toBeDefined()
  })
})