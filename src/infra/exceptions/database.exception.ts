import { BaseError } from "@/domain/entities";
import { AplicationError } from "@/domain/enums";

export class DataBaseException {
  static build(detail?: string) {
    return BaseError.build({ status: AplicationError.Status.INTERNAL_ERROR, title: 'Database Error', detail })
  }
}