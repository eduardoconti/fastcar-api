import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from './database/orm/prisma';
import { PrismaService } from './database/orm/prisma/prisma.service';
import { EncrypterService } from './encrypter';
import { JwtService } from './jwt';

@Module({
  providers: [
    JwtService,
    UserPrismaRepository,
    EncrypterService,
    PrismaClient,
    PrismaService,
  ],
  exports: [JwtService, UserPrismaRepository, EncrypterService],
})
export class InfraModule {}
