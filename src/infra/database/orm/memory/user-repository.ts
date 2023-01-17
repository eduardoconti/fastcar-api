import { IUserRepository, QueryParams } from '@domain/contracts';
import { User, UserProps } from '@domain/entities';
import { UserModel } from '@infra/database/models';

import { UserOrmMapper } from '../mapper';

const users: UserModel[] = [];
export class UserMemoryRepository implements IUserRepository {
  findOne(params: QueryParams<UserProps>): User | undefined {
    const user = users.find((e) => {
      return (
        (params?.login ? e.login === params?.login : true) &&
        (params?.id ? e.id === params?.id : true)
      );
    });
    if (user) return UserOrmMapper.toEntity(user);
  }

  save(entity: User): User {
    users.push(UserOrmMapper.toModel(entity));
    return entity;
  }

  findMany(): User[] {
    return users.map((user) => UserOrmMapper.toEntity(user));
  }

  update(user: User): User {
    const index = users.findIndex((e) => e.id === user.id.value);
    users[index] = UserOrmMapper.toModel(user);
    return user;
  }
}
