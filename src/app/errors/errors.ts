import { BaseError } from "@/domain/entities";
import { AplicationError } from "@/domain/enums";

export const badRequest = (detail?: string) => BaseError.build({ status: AplicationError.Status.INVALID_REQUEST, title: AplicationError.Message.INVALID_REQUEST, detail })
export const unauthorized = (detail?: string) => BaseError.build({ status: AplicationError.Status.UNAUTHORIZED, title: AplicationError.Message.UNAUTHORIZED, detail })
export const notFound = (detail?: string) => BaseError.build({ status: AplicationError.Status.NOT_FOUND, title:  AplicationError.Message.NOT_FOUND, detail })
export const internalServerError = (detail?: string) => BaseError.build({ status: AplicationError.Status.INTERNAL_ERROR, title:  AplicationError.Message.INTERNAL_ERROR, detail })