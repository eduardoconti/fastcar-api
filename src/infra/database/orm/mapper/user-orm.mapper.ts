import { User } from "@/domain/entities";
import { Email, Name, Password, UserStatus } from "@/domain/value-objects/user";
import { UserModel } from "../../models";

export class UserOrmMapper {
  static toModel(entity: User): UserModel {
    const { createdAt, updatedAt, props: { name, login, password, status }, id } = entity;
    return {
      id: id.value,
      name: name.value,
      login: login.value,
      password: password.value,
      updatedAt: updatedAt.value,
      createdAt: createdAt.value,
      status: status.value
    }
  }
  
  static toEntity(user: UserModel) {
    return User.create(
      {
        name: new Name(user.name),
        login: new Email(user.login),
        password: new Password(user.password),
        status: new UserStatus(user.status)
      }
    )
  }
}