import { userModelMockData } from "@/../tests/infra/models/mocks";
import { User } from "@/domain/entities";

export const userEntityMock =  User.build(userModelMockData)