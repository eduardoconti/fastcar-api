import { CreateUserInput, CreateUserOutput } from '@app/use-cases/user';
import { UserModel } from '@infra/database/models';
import { CreateUserControllerInput } from '@presentation/controllers/user/create-user.controller.dto';

export const userModelMockData: UserModel = {
  id: '58daf3da-aa8d-4dab-b226-b41d10091348',
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: '$2b$15$Bw53kdeH0qaruPI0g8pieuNMqr7f72DX6.Ls0U/cGsxeBGL7Evct2',
  status: 'DISABLED',
  createdAt: new Date('2022-02-02'),
};

export const createUserDtoMock: CreateUserInput = {
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: '$2b$15$Bw53kdeH0qaruPI0g8pieuNMqr7f72DX6.Ls0U/cGsxeBGL7Evct2',
};

export const createUserOutputMock: CreateUserOutput = {
  id: '58daf3da-aa8d-4dab-b226-b41d10091348',
  name: 'fakeName',
  login: 'fakeLogin@123.com',
};
export const ceateUserControllerInput: CreateUserControllerInput = {
  name: 'fakeName',
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
  confirmPassword: 'fakePassword',
};
