import { Result, User } from "@/domain/entities";
import { UserModel } from "@/infra/models";

export type CreateUserDTO = Omit<User, "id"> & { confirmPassword: string }

export interface ICreateUser {
  create(user: CreateUserDTO): Promise<Result<UserModel>>
}