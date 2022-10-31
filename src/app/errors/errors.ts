import { Aplication } from "@/domain/enums";
import { BadRequestException } from "../exceptions";

export const badRequest = (detail: string) => new BadRequestException(detail)
export const unauthorized = (detail: string) => new BadRequestException(detail)
export const notFound = (detail: string) => new BadRequestException(detail)
export const internalServerError = (detail: string) => new BadRequestException(detail)