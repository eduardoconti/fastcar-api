import { InfraModule } from '@infra/infra.module';
import { Module } from '@nestjs/common';
import { AuthUseCase } from './use-cases/auth';
import {
  ConfirmUserRegistrationUseCase,
  CreateUserUseCase,
} from './use-cases/user';
import { RegisterVehicleUseCase } from './use-cases/vehicle';

@Module({
  imports: [InfraModule],
  providers: [
    AuthUseCase,
    CreateUserUseCase,
    ConfirmUserRegistrationUseCase,
    RegisterVehicleUseCase,
  ],
  exports: [
    AuthUseCase,
    CreateUserUseCase,
    ConfirmUserRegistrationUseCase,
    RegisterVehicleUseCase,
  ],
})
export class AppModule {}
