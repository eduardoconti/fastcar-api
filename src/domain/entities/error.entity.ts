
export type BaseErrorDTO = {
  status?: number
  title?: string
  detail?: string
}
export class BaseError extends Error {
  status!: number
  title!: string
  detail!: string

  constructor(
    status: number,
    title?: string,
    detail?: string,
  ) {
    super(title ?? 'Internal server error')

    this.status = status ?? 500
    this.title = title ?? this.message
    this.detail = detail ?? 'An unexpected error ocurred!'

  }

}