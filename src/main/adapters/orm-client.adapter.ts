import { Logger } from "@/app/use-cases/logger/logger"
import { BaseError } from "@/domain/entities/error.entity"
import { IAdapter, ILogger, IUserRepository } from "@/domain/interfaces"
import { UserModel } from "@/infra/database/models"
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface"
import { UserMemoryRepository } from "@/infra/database/orm/memory"
import { AppDataSource } from "@/infra/database/orm/typeorm/data-source"
import { PrismaClient } from "@prisma/client"

const DATABASE_CONNECTION_MESSAGE = 'Database connection initialized'
type OrmSlug = 'prisma' | 'typeorm' | 'memory'
export class OrmClientAdapter implements IAdapter<IOrmClient>{

  protected logger!: ILogger
  constructor() {
    this.logger = new Logger()
  }
  adapt(): IOrmClient {
    switch (process.env.ORM_ADAPTER as OrmSlug) {
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
        this.logger.system('Using prisma')
        return this.adaptPrisma()
    }
  }

  private adaptPrisma(): IOrmClient {
    const prisma = new PrismaClient()
    this.logger.system(DATABASE_CONNECTION_MESSAGE)
    const { findUnique, create, findMany }: any = prisma.user
    const userRepository = {
      findUnique, create, find: findMany
    }
    return { userRepository }
  }

  private adaptTypeORM(): IOrmClient {
    AppDataSource.initialize()
      .then(() => {
        this.logger.system(DATABASE_CONNECTION_MESSAGE)
      })
      .catch((error) => { throw new BaseError(500, 'Database exception', error?.message) })
    const repository = AppDataSource.getRepository(UserModel)

    const userRepository = {
      findUnique(findParams) {
        return repository.findOne({ where: findParams.where })
      },
      create(createParams) {
        return repository.save(createParams.data)
      },
      find(findParams) {
        return repository.find(findParams)
      }
    } as IUserRepository
    return { userRepository }
  }

  private adaptMemory(): IOrmClient {
    const userRepository = new UserMemoryRepository()
    return {
      userRepository
    }
  }
}