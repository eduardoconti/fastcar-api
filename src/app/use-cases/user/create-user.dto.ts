export type CreateUserInputDTO = {
  name: string,
  login: string,
  password: string,
  confirmPassword: string
}
export type CreateUserOutputDTO = {
  id: string,
  name: string,
  login: string,
}
