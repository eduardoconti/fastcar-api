import { Module } from '@nestjs/common';

import { PresentationModule } from './presentation/presentation.module';
import { AppModule as AplicationModule } from './app/app.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [PresentationModule, AplicationModule, InfraModule],
})
export class AppModule {}
