import { IAdapter } from "@/app/interfaces"
import { ILogger } from "@/app/interfaces"
import { UserMemoryRepository } from "@/infra/database/orm/memory"
import { Logger } from "@/infra/logger"
import { PrismaClient } from "@prisma/client"
import { IOrmClient } from "../database/orm/interfaces"
import { UserPrismaRepository } from "../database/orm/prisma"
import { AppDataSource, UserTypeORMRepository } from "../database/orm/typeorm"
import { DataBaseException } from "../exceptions"

const DATABASE_CONNECTION_MESSAGE = 'Database connection initialized'
type OrmSlug = 'prisma' | 'typeorm' | 'memory'
export class OrmClientAdapter implements IAdapter<IOrmClient>{

  protected logger!: ILogger
  constructor() {
    this.logger = new Logger()
  }
  adapt(): IOrmClient {
    switch ('memory' as OrmSlug) {
      case 'prisma':
        this.logger.system('Using prisma')
        return this.adaptPrisma()
      case 'typeorm':
        this.logger.system('Using typeorm')
        return this.adaptTypeORM()
      case 'memory':
        this.logger.system('Using memory')
        return this.adaptMemory()
      default:
        this.logger.system('Using default prisma')
        return this.adaptPrisma()
    }
  }

  private adaptPrisma(): IOrmClient {
    const prisma = new PrismaClient()
    this.logger.system(DATABASE_CONNECTION_MESSAGE)
    const userRepository = new UserPrismaRepository(prisma)
    return { userRepository }
  }

  private adaptTypeORM(): IOrmClient {
    AppDataSource.initialize()
      .then(() => {
        this.logger.system(DATABASE_CONNECTION_MESSAGE)
      })
      .catch((error) => { throw DataBaseException.build(error?.message) })
    const userRepository = new UserTypeORMRepository(AppDataSource)

    return { userRepository }
  }

  private adaptMemory(): IOrmClient {
    const userRepository = new UserMemoryRepository()
    return {
      userRepository
    }
  }
}