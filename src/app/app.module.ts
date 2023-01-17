import { InfraModule } from '@infra/infra.module';
import { Module } from '@nestjs/common';
import { AuthUseCase } from './use-cases/auth';
import {
  ConfirmUserRegistrationUseCase,
  CreateUserUseCase,
} from './use-cases/user';

@Module({
  imports: [InfraModule],
  providers: [AuthUseCase, CreateUserUseCase, ConfirmUserRegistrationUseCase],
  exports: [AuthUseCase, CreateUserUseCase, ConfirmUserRegistrationUseCase],
})
export class AppModule {}
