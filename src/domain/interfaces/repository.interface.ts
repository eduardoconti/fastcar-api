import { IDatabaseModel } from "./database-model.interface"

export type FindParams<IDatabaseModel> = {
  where?: Partial<IDatabaseModel>
}
export type CreateParams<IDatabaseModel> = {
  data: Partial<IDatabaseModel>
}
export interface IRepository<IDatabaseModel> {
  findUnique: (findParams: FindParams<IDatabaseModel>) => Promise<IDatabaseModel>
  create: (createParams: CreateParams<IDatabaseModel>) => Promise<IDatabaseModel>
}

export interface IRepositoryClientAdapter {
  adapt: (entity: string) => IRepository<IDatabaseModel>
}