import { BaseError } from "@/domain/entities";

export const badRequest = (detail?: string) => new BaseError(400, 'Bad Request', detail)
export const unauthorized = (detail?: string) => new BaseError(401, 'Unauthorized', detail)
export const notFound = (detail?: string) => new BaseError(404, 'Not found', detail)
export const internalServerError = (detail?: string) => new BaseError(500, 'Internal Server Error', detail)