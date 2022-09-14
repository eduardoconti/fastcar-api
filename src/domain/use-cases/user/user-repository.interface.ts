import { User } from "@/domain/entities";
import { UserModel } from "@/infra/models";
export type FindUserParams = Partial<Omit<UserModel, 'veichles'>>
export interface IUserRepository {
  findOne: (params: FindUserParams) => Promise<UserModel>
  add: (user: User) => Promise<UserModel>
}