import { ICreateUserUseCase } from "@app/use-cases/user";
import { Result } from "@domain/contracts";
import { ICommandHandler } from "@domain/interfaces";

import { RegisterUserCommand } from "../commands";

export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
   commandToHandle: string = RegisterUserCommand.name;

   constructor(private readonly useCase: ICreateUserUseCase) {}

   async handle(command: RegisterUserCommand): Promise<Result> { 
      const result = await this.useCase.execute(command);
      return result.isSuccess ? Result.ok(): result;
   }
}