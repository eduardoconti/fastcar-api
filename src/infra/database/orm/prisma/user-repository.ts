import { IUserRepository, QueryParams } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";
export class UserPrismaRepository implements IUserRepository<User, UserProps> {
  constructor(private readonly prismaClient: PrismaClient) {
  }

  async findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique({ where: { id: params.id?.value, login: params?.login } })
    if (user)
      return User.build(user)
  }

  async save(createParams: User): Promise<User> {
    const { createdAt, updatedAt, ...rest } = createParams;
    const user = await this.prismaClient.user.create({ data: { createdAt: createdAt.value, ...rest.props } })
    return User.build(user)
  }

  async findMany(params?: QueryParams<UserProps>): Promise<User[] | undefined> {
    const users = await this.prismaClient.user.findMany({ where: { id: params?.id?.value, login: params?.login } })
    if (users)
      return users.map((e) => User.build(e))
  }
}