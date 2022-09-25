import { CreateParams, FindParams, IUserRepository } from "@/app/interfaces";
import { User } from "@/domain/entities";
import { UserModel } from "@/infra/database/models";

const users: UserModel[] = []
export class UserMemoryRepository implements IUserRepository {
  findUnique(findParams: FindParams<User>): User | undefined {
    const user = users.find((e) => {
      const { where } = findParams
      return (where?.login ? e.login === where?.login : true) &&
        (where?.id ? e.id === where?.id : true)
    })
    if (user) return User.build(user)
  }
  create(createParams: CreateParams<User>): User {
    users.push(createParams.data)
    return createParams.data
  }
  find() {
    return users.map((e) => User.build(e))
  }
}