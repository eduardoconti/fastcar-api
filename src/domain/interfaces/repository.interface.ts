export type FindParams<E> = {
  where?: Partial<E>
}
export type CreateParams<E> = {
  data: Partial<E>
}
export interface IRepository<E = any> {
  findUnique: (findParams: FindParams<E>) => Promise<E> | E
  create: (createParams: CreateParams<E>) => Promise<E> | E
}
