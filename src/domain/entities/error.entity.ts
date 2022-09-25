import { Aplication } from "../enums"
export class BaseError extends Error {
  status!: Aplication.Status
  title!: string
  detail!: string
  type?: string

  private constructor(
    status: Aplication.Status,
    title: string,
    detail: string,
    type?: string
  ) {
    super(title)
    this.status = status
    this.title = title
    this.detail = detail
    this.type = type
  }

  static build(dto: Partial<BaseError>) {
    return new BaseError(dto.status ?? Aplication.Status.INTERNAL_ERROR,
      dto.title ??
      Aplication.Message.INTERNAL_ERROR,
      dto.detail ?? 'An unexpected error ocurred!',
      dto.type);
  }
}