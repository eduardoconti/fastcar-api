import { CreateUserUseCase, ICreateUserUseCase } from '@app/use-cases/user';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateUserControllerInput } from './create-user.controller.dto';

@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  @Post()
  async handle(@Body() request: CreateUserControllerInput) {
    const result = await this.createUserUseCase.execute(request);
    return result.getValue();
  }
}
