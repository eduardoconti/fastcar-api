import { IUserRepository, QueryParams } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { UserModel } from "@/infra/database/models";

const users: UserModel[] = []
export class UserMemoryRepository implements IUserRepository<User, UserProps> {
  findOne(params: QueryParams<UserProps>): User | undefined {
    const user = users.find((e) => {
      return (params?.login ? e.login === params?.login : true) &&
        (params?.id ? e.id === params?.id : true)
    })
    if (user) return User.build(user)
  }
  save(entity: User): User {
    const { id, props: { name, login, password } } = entity
    users.push({ id, name, login, password })
    return entity
  }
  findMany(): User[] {
    return users.map((e) => User.build(e))
  }
}