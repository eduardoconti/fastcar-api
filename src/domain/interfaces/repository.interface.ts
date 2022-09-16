import { IDatabaseModel } from "./database-model.interface"

export type FindParams<IDatabaseModel> = {
  where?: Partial<IDatabaseModel>
}
export type CreateParams<IDatabaseModel> = {
  data: Partial<IDatabaseModel>
}
export interface IRepository<T extends IDatabaseModel> {
  findUnique: (findParams: FindParams<T>) => Promise<T>
  create: (createParams: CreateParams<T>) => Promise<T>
}

export interface IRepositoryClientAdapter {
  adapt: (entity: string) => IRepository<IDatabaseModel>
}