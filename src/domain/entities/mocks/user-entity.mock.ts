import { User } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import {
  Email,
  Name,
  Password,
  UserStatus,
  UserStatusEnum,
} from '@domain/value-objects/user';
import { userModelMockData } from '@infra/database/models/mocks';

export const userEntityMock = new User({
  id: new UUID('58daf3da-aa8d-4dab-b226-b41d10091348'),
  createdAt: DateVO.now(),
  props: {
    name: new Name(userModelMockData.name),
    login: new Email(userModelMockData.login),
    password: new Password(userModelMockData.password),
    status: new UserStatus(UserStatusEnum.DISABLED),
  },
});
