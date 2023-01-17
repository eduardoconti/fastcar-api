import { CreateUserOutput, ICreateUserUseCase } from '@app/use-cases/user';
import { Result } from '@domain/contracts';
import {
  ceateUserControllerInput,
  userModelMockData,
} from '@infra/database/models/mocks';

import { CreateUserController } from './create-user.controller';

const makeCreateUserUseCaseStub = (): ICreateUserUseCase => {
  class CreateUserUseCaseStub implements ICreateUserUseCase {
    async execute(): Promise<Result<CreateUserOutput>> {
      return Result.ok({
        id: '',
        name: '',
        login: '',
      });
    }
  }
  return new CreateUserUseCaseStub();
};

interface SutTypes {
  sut: CreateUserController;
  createUserUseCaseStub: ICreateUserUseCase;
}

const makeSut = (): SutTypes => {
  const createUserUseCaseStub = makeCreateUserUseCaseStub();
  const sut = new CreateUserController(createUserUseCaseStub);
  return {
    sut,
    createUserUseCaseStub,
  };
};
describe('Create user controller', () => {
  it('should execute controller', async () => {
    const { sut, createUserUseCaseStub } = makeSut();
    jest
      .spyOn(createUserUseCaseStub, 'execute')
      .mockReturnValue(Result.ok(userModelMockData));

    const result = await sut.handle(ceateUserControllerInput);

    expect(result).toBeDefined();
    expect(createUserUseCaseStub.execute).toBeCalledTimes(1);
  });
});
