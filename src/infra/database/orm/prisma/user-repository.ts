import { CreateParams, FindParams, IUserRepository } from "@/app/interfaces";
import { User } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {
  }

  async findUnique(findParams: FindParams<User>): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique(findParams)
    if (user) return User.build(user)
  }

  async create(createParams: CreateParams<User>): Promise<User> {
    await this.prismaClient.user.create({ data: createParams.data })
    return createParams.data
  }

  async find(findParams?: FindParams<User>): Promise<User[] | undefined> {
    const user = await this.prismaClient.user.findMany(findParams)
    if (user) return user.map((e) => User.build(e))
  }
}