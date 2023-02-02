import { AppModule } from '@app/app.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
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
  imports: [AppModule, TerminusModule, HttpModule],
})
export class PresentationModule {}
