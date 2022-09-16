import { User } from "@/domain/entities";
import { BaseError } from "@/domain/entities/error.entity";
import { IAdapter, IRepository } from "@/domain/interfaces";
import { IDatabaseModel } from "@/domain/interfaces/database-model.interface";
import { UserModel } from "@/infra/models";
import { PrismaClient } from "@prisma/client";

export class Repository implements IAdapter<IRepository<IDatabaseModel>>{
  repository!: PrismaClient
  constructor() {
    this.repository = new PrismaClient()
  }
  adapt(type: string): IRepository<IDatabaseModel>{
    if (type === typeof User) {
      return this.repository.user as unknown as IRepository<UserModel>
    }
    throw new BaseError(500, '', '')
  }
}