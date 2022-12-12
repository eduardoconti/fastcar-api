import { AuthUseCase } from "@app/use-cases/auth";

export const authInputMock: AuthUseCase.Input = {
   login: "fakeLogin@123.com",
   password: "fakePassword",
};

export const authOutputMock: AuthUseCase.Output = {
   token: "jwt token",
};

export const tokenPayloadMock: AuthUseCase.TokenPayload = {
   userId: "fakeUuid",
};
