import { User } from "@/domain/entities";

export type CreateUserDTO = Omit<User, "id"> & { confirmPassword: string }
export type CreateUserResponseDTO = Omit<User, "password">
