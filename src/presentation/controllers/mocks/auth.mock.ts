import {
  AuthUseCaseInput,
  AuthUseCaseOutput,
  TokenPayload,
} from '@app/use-cases/auth';

export const authInputMock: AuthUseCaseInput = {
  login: 'fakeLogin@123.com',
  password: 'fakePassword',
};

export const authOutputMock: AuthUseCaseOutput = {
  token: 'jwt token',
};

export const tokenPayloadMock: TokenPayload = {
  userId: 'fakeUuid',
};
