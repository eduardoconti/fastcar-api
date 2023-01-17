import {
  ConfirmUserRegistrationUseCase,
  IConfirmUserRegistrationUseCase,
} from '@app/use-cases/user';
import { Controller, Get, HttpCode, Inject, Param } from '@nestjs/common';

@Controller('user')
export class ConfirmUserRegistrationController {
  constructor(
    @Inject(ConfirmUserRegistrationUseCase)
    private readonly confirmUserRegistration: IConfirmUserRegistrationUseCase,
  ) {}

  @Get(':id/confirm')
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.confirmUserRegistration.execute({
      id,
    });
    return result.getValue();
  }
}
