import { User } from "@/domain/entities";
import { OrmClient } from "@/domain/interfaces";
import { UserModel } from "@/infra/models";

const users: UserModel[] = []
export class UserMemoryRepository implements OrmClient.IUserRepository {
  findUnique(findParams: OrmClient.FindParams<User>): User | undefined {
    const user = users.find((e) => {
      const { where } = findParams
      return (where?.login ? e.login === where?.login : true) &&
        (where?.id ? e.id === where?.id : true)
    })
    return user
  }
  create(createParams: OrmClient.CreateParams<User>): User {
    users.push(createParams.data)
    return createParams.data
  }
  find() {
    return users.map((e) => {
      return User.build(e)
    })
  }

}