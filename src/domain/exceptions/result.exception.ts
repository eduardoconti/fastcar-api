import { BaseError } from "../entities/error.entity";
import { AplicationError } from "../enums";

export class ResultException {
  static build(detail: string) {
    return BaseError.build({ status: AplicationError.Status.INTERNAL_ERROR, title: 'Invalid Operation', detail })
  }
}