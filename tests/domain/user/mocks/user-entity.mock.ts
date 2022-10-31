import { userModelMockData } from "@/../tests/infra/models/mocks";
import { User } from "@/domain/entities";
import { Email, Name, Password } from "@/domain/value-objects/user";

export const userEntityMock = User.create({
  name: new Name(userModelMockData.name),
  login: new Email(userModelMockData.login),
  password: new Password(userModelMockData.password)
});
