import { BaseError } from "../entities/error.entity";
import { AplicationError } from "../enums";

export class CreateUserException {
  static build(detail: string, invalidFields?: any[]) {
    return BaseError.build({ status: AplicationError.Status.INVALID_REQUEST, title: 'Failed to create user', detail })
  }
}