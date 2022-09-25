import { BaseError } from "@/domain/entities";
import { Aplication } from "@/domain/enums";

export class DataBaseException {
  static build(detail?: string) {
    return BaseError.build({ status: Aplication.Status.INTERNAL_ERROR, title: 'Database Error', detail })
  }
}