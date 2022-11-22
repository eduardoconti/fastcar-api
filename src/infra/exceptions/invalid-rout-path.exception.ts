import { Aplication } from "@/domain/enums";
import { BaseException } from "@/domain/exceptions";

export class InvalidRouteException extends BaseException{
  readonly code = Aplication.Status.INTERNAL_ERROR;
  constructor(metadata?: unknown){
    super('Invalid route path', metadata)
  }
}