import { User } from "@/domain/entities";
export type FindUserParams = Partial<Omit<User, 'veichles'>>
export interface IUserRepository {
  findOne: (params: FindUserParams) => Promise<User | undefined>
  add: (user: User) => Promise<User>
}