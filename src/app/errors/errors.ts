import { BaseError } from "@/domain/entities";
import { Aplication } from "@/domain/enums";

export const badRequest = (detail?: string) => BaseError.build({ status: Aplication.Status.INVALID_REQUEST, title: Aplication.Message.INVALID_REQUEST, detail })
export const unauthorized = (detail?: string) => BaseError.build({ status: Aplication.Status.UNAUTHORIZED, title: Aplication.Message.UNAUTHORIZED, detail })
export const notFound = (detail?: string) => BaseError.build({ status: Aplication.Status.NOT_FOUND, title:  Aplication.Message.NOT_FOUND, detail })
export const internalServerError = (detail?: string) => BaseError.build({ status: Aplication.Status.INTERNAL_ERROR, title:  Aplication.Message.INTERNAL_ERROR, detail })