import { badRequest } from "@app/errors/errors";
import { IEncrypter } from "@app/interfaces";
import { CreateUserInput, CreateUserOutput } from "@app/use-cases/user";
import { IUserRepository, Result } from "@domain/contracts";
import { User } from "@domain/entities";
import { IUseCase } from "@domain/interfaces";
import { Email } from "@domain/value-objects/user";

export type ICreateUserUseCase = IUseCase<
CreateUserInput,
CreateUserOutput
>;
export class CreateUserUseCase implements ICreateUserUseCase {
   constructor(
      private readonly userRepository: IUserRepository,
      private readonly encrypter: IEncrypter,
   ) {}

   async execute(
      user: CreateUserInput,
   ): Promise<Result<CreateUserOutput>> {
      const { name, login, password } = user;

      if (await this.userRepository.findOne({ login: new Email(login) }))
         return Result.fail(badRequest("This login belongs to a user"));

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
