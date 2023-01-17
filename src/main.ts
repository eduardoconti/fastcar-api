import { PrismaService } from '@infra/database/orm/prisma';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(parseInt(process.env.PORT as string) || 3006);
}
bootstrap();
