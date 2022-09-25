import { BaseError } from "../entities/error.entity";
import { Aplication } from "../enums";

export class CreateUserException {
  static build(detail: string, invalidFields?: any[]) {
    return BaseError.build({ status: Aplication.Status.INVALID_REQUEST, title: 'Failed to create user', detail })
  }
}