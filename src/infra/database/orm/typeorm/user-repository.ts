import { IUserRepository, QueryParams } from '@domain/contracts';
import { User, UserProps } from '@domain/entities';
import { DataSource, Repository } from 'typeorm';

import { UserModel } from '../../models';
import { UserOrmMapper } from '../mapper';

export class UserTypeORMRepository implements IUserRepository {
  protected ormRepository: Repository<UserModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(UserModel);
  }

  async findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: params.id?.value, login: params?.login?.value },
    });
    if (user) return UserOrmMapper.toEntity(user);
  }

  async save(entity: User): Promise<User> {
    await this.ormRepository.save(UserOrmMapper.toModel(entity));
    return entity;
  }

  async findMany(params: QueryParams<UserProps>): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      where: { id: params.id?.value, login: params?.login?.value },
    });
    if (users)
      return users.map((user) => {
        return UserOrmMapper.toEntity(user);
      });
  }

  async update(entity: User): Promise<User> {
    await this.ormRepository.save(UserOrmMapper.toModel(entity));
    return entity;
  }
}
