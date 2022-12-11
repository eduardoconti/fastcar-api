import { UserModel } from "../../models";

import { User } from "@/domain/entities";
import { DateVO, UUID } from "@/domain/value-objects";
import { Email, Name, Password, UserStatus } from "@/domain/value-objects/user";

export class UserOrmMapper {
   static toModel(entity: User): UserModel {
      const {
         createdAt,
         updatedAt,
         props: { name, login, password, status },
         id,
      } = entity;
      return {
         id: id.value,
         name: name.value,
         login: login.value,
         password: password.value,
         updatedAt: updatedAt.value,
         createdAt: createdAt.value,
         status: status.value,
      };
   }

   static toEntity(user: UserModel) {
      return new User({
         id: new UUID(user.id),
         createdAt: new DateVO(user.createdAt),
         props: {
            name: new Name(user.name),
            login: new Email(user.login),
            password: new Password(user.password),
            status: new UserStatus(user.status),
         },
      });
   }
}
