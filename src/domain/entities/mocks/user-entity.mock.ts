
import { User } from "@/domain/entities";
import { Email, Name, Password, UserStatus, UserStatusEnum } from "@/domain/value-objects/user";
import { userModelMockData } from "@/infra/database/models/mocks";

export const userEntityMock = User.create({
  name: new Name(userModelMockData.name),
  login: new Email(userModelMockData.login),
  password: new Password(userModelMockData.password),
  status: new UserStatus(UserStatusEnum.DISABLED)
});
