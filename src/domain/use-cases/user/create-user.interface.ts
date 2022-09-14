import { User } from "@/domain/entities";

export type CreateUserDTO = Omit<User, "id"> & { confirmPassword: string }

export interface ICreateUser {
  create(user: CreateUserDTO): Promise<User>
}