

import { IUserRepository, QueryParams } from "@domain/contracts";
import { DomainEvents } from "@domain/domain-events";
import { User, UserProps } from "@domain/entities";
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
      await this.prismaClient.user.create({
         data: UserOrmMapper.toModel(entity),
      });

      await DomainEvents.publishEvents(entity.id);
      return entity;
   }

   async findMany(params?: QueryParams<UserProps>): Promise<User[] | undefined> {
      const users = await this.prismaClient.user.findMany({
         where: { id: params?.id?.value, login: params?.login?.value },
      });
      if (users) return users.map(user => UserOrmMapper.toEntity(user));
   }

   async update(entity: User): Promise<User> {
      await this.prismaClient.user.update({
         data: UserOrmMapper.toModel(entity),
         where: { id: entity.id.value },
      });
      await DomainEvents.publishEvents(entity.id);
      return entity;
   }
}
