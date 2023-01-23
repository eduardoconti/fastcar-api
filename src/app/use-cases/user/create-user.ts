import { badRequest } from '@app/errors/errors';
import { IEncrypter } from '@app/interfaces';
import { IUserRepository, Result } from '@domain/contracts';
import { User } from '@domain/entities';
import { IUseCase } from '@domain/interfaces';
import { Email } from '@domain/value-objects/user';
import { UserPrismaRepository } from '@infra/database/orm/prisma';
import { EncrypterService } from '@infra/encrypter';
import { Inject, Injectable } from '@nestjs/common';

export type CreateUserInput = {
  name: string;
  login: string;
  password: string;
};
export type CreateUserOutput = {
  id: string;
  name: string;
  login: string;
};

export type ICreateUserUseCase = IUseCase<CreateUserInput, CreateUserOutput>;
@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(UserPrismaRepository)
    private readonly userRepository: IUserRepository,
    @Inject(EncrypterService)
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(user: CreateUserInput): Promise<Result<CreateUserOutput>> {
    const { name, login, password } = user;
    if (await this.userRepository.findOne({ login: new Email(login) }))
      return Result.fail(badRequest('This login belongs to a user'));

    const passwordHashResult = await this.encrypter.hash(password);
    const userEntity = User.create({
      name,
      login,
      password: passwordHashResult,
    });
    await this.userRepository.save(userEntity);
    return Result.ok({ id: userEntity.id.value, name, login });
  }
}
