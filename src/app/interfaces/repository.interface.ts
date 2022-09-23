import { User } from "@/domain/entities"

export type FindParams<E> = {
  where: Partial<E>
}
export type CreateParams<E> = {
  data: E
}
export interface IRepository<E> {
  findUnique: (findParams: FindParams<E>) => Promise<E | undefined> | E | undefined
  create: (createParams: CreateParams<E>) => Promise<E> | E
  find: (findParams?: FindParams<E>) => Promise<E[] | undefined> | E[] | undefined
}

export type IUserRepository = Pick<IRepository<User>, 'create' | 'findUnique' | 'find'>