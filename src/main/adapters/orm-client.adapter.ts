import { Logger } from "@/app/use-cases/logger/logger";
import { BaseError } from "@/domain/entities/error.entity";
import { IAdapter, ILogger, IOrmClient } from "@/domain/interfaces";
import { UserMemoryRepository } from "@/infra/orm/memory";
import { PrismaClient } from "@prisma/client";
type OrmSlug = 'prisma' | 'typeorm' | 'memory'
export class OrmClientAdapter implements IAdapter<IOrmClient>{

  protected logger!: ILogger
  constructor(){
    this.logger = new Logger()
  }
  adapt(): IOrmClient {
    switch (process.env.ORM_ADAPTER as OrmSlug) {
      case 'prisma':
        this.logger.info('ORM: using prisma')
        return this.adaptPrisma()
      case 'typeorm':
        this.logger.info('ORM: using typeorm')
        return this.adaptTypeORM()
      case 'memory':
        this.logger.info('ORM: using memory')
        return this.adaptMemory()
      default:
        return this.adaptPrisma()
    }
  }

  private adaptPrisma(): IOrmClient {
    const prisma = new PrismaClient()
    const { findUnique, create, findMany }: any = prisma.user
    const userRepository = {
      findUnique, create, find: findMany
    }
    return { userRepository }
  }

  private adaptTypeORM(): IOrmClient {
    throw new BaseError(500, 'Not implemented TypeORM')
  }

  private adaptMemory(): IOrmClient {
    const userRepository = new UserMemoryRepository()
    return {
      userRepository
    }
  }
}