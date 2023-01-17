import { AppModule } from '@app/app.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth';
import { HealthCheckController } from './controllers/health';
import {
  ConfirmUserRegistrationController,
  CreateUserController,
} from './controllers/user';

@Module({
  controllers: [
    AuthController,
    CreateUserController,
    ConfirmUserRegistrationController,
    HealthCheckController,
  ],
  imports: [AppModule],
})
export class PresentationModule {}
