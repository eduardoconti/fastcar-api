import { User } from "@/domain/entities";
import { IRepository } from "@/domain/interfaces";
import { FindUserParams, IUserRepository } from "@/domain/use-cases/user";
import { UserModel } from "@/infra/models";

export class UserRepository implements IUserRepository {

  constructor( private readonly repository: IRepository<UserModel>) {
  }

  async findOne(params: FindUserParams): Promise<UserModel> {
    const data = await this.repository.findUnique({ where: { ...params } })
    return data
  }

  async add(user: User): Promise<UserModel> {
    const data = await this.repository.create({ data: user })
    return data
  }
}