import { IUserRepository, QueryParams } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { DataSource, Repository } from "typeorm";
import { UserModel } from "../../models";

export class UserTypeORMRepository implements IUserRepository<User, UserProps> {
  protected ormRepository: Repository<UserModel>
  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(UserModel)
  }

  async findOne(params: QueryParams<UserProps>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id: params.id?.value, login: params?.login } })
    if (user)
      return User.build(user)
  }

  async save(createParams: User): Promise<User> {
    const { createdAt, updatedAt, ...rest } = createParams;
    const user = await this.ormRepository.save({ ...rest.props, createdAt: createdAt.value })
    return User.build(user)
  }

  async findMany(params: QueryParams<UserProps>): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({ where: { id: params.id?.value, login: params?.login } })
    if (users)
      return users.map((e) => { return User.build(e) })
  }
}