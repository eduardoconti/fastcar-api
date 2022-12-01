import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user"
import { UserModel } from "@/infra/database/models"
import { CreateUserControllerInput } from "@/presentation/controllers/user/create-user.controller.dto"

export const userModelMockData: UserModel = {
  id: 'fakeUuid',
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
  status: "DISABLED",
  createdAt: new Date("2022-02-02")
}

export const createUserDtoMock: CreateUserInputDTO = {
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
}

export const createUserOutputMock: CreateUserOutputDTO = {
  id: 'fakeUuid',
  name: 'fakeName',
  login: 'fakeLogin@123.com',
}
export const ceateUserControllerInput: CreateUserControllerInput = {
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
  confirmPassword: 'fakePassword',
}
