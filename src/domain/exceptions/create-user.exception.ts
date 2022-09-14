import { BaseError } from "../entities/error.entity";

export class CreateUserException extends BaseError {
  constructor(reason: string, invalidFields?: any[]) {
    super(400, 'Failed to create user', reason)
  }
}