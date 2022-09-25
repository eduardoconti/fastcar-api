import { BaseError } from "../entities/error.entity";
import { Aplication } from "../enums";

export class ResultException {
  static build(detail: string) {
    return BaseError.build({ status: Aplication.Status.INTERNAL_ERROR, title: 'Invalid Operation', detail })
  }
}