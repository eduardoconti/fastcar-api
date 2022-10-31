import { IUserRepository } from "@/app/interfaces/repository.interface";
import { QueryParams } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";
import { UserOrmMapper } from "../mapper";
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: params.id?.value, login: params?.login?.value },
    });
    if (user) return UserOrmMapper.toEntity(user);
  }

  async save(entity: User): Promise<User> {
    console.log(UserOrmMapper.toModel(entity))
    await this.prismaClient.user.create({
      data: UserOrmMapper.toModel(entity),
    });
    return entity;
  }

  async findMany(params?: QueryParams<UserProps>): Promise<User[] | undefined> {
    const users = await this.prismaClient.user.findMany({
      where: { id: params?.id?.value, login: params?.login?.value },
    });
    if (users) return users.map((user) => UserOrmMapper.toEntity(user));
  }
}
