import { UserModel } from "@/infra/models"
import { CreateUserDTO } from "@/domain/use-cases/user"
export const userModelMockData: UserModel = {
  id: 'fakeUuid',
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword'
}

export const createUserDtoMock: CreateUserDTO = {
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
  confirmPassword: 'fakePassword'
}