import { IController } from '@app/interfaces';
import {
  AuthUseCase,
  AuthUseCaseOutput,
  IAuthUseCase,
} from '@app/use-cases/auth';
import { Result } from '@domain/contracts';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthControllerInput } from './auth-input.dto';

export type IAuthController = IController<AuthUseCaseOutput>;
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCase)
    private readonly authUseCase: IAuthUseCase,
  ) {}

  @Post()
  async handle(
    @Body() request: AuthControllerInput,
  ): Promise<AuthUseCaseOutput> {
    const result = await this.authUseCase.execute(request);
    if (result.isFailure) {
      throw result.error;
    }
    return result.getValue() as AuthUseCaseOutput;
  }
}
