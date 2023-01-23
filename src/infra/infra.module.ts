import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  UserPrismaRepository,
  VehiclePrismaRepository,
} from './database/orm/prisma';
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
    VehiclePrismaRepository,
  ],
  exports: [
    JwtService,
    UserPrismaRepository,
    EncrypterService,
    VehiclePrismaRepository,
  ],
})
export class InfraModule {}
