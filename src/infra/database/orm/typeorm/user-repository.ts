import { CreateParams, FindParams, IUserRepository } from "@/app/interfaces";
import { User } from "@/domain/entities";
import { DataSource, Repository } from "typeorm";
import { UserModel } from "../../models";

export class UserTypeORMRepository implements IUserRepository {
  protected ormRepository: Repository<UserModel>
  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(UserModel)
  }

  async findUnique(findParams: FindParams<User>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(findParams)
    if (user) return User.build(user)
  }

  async create(createParams: CreateParams<User>): Promise<User> {
    await this.ormRepository.save(createParams.data)
    return createParams.data
  }

  async find(findParams?: FindParams<User>): Promise<User[] | undefined> {
    const users = await this.ormRepository.find(findParams)
    if (users) return users.map((e) => User.build(e))
  }
}