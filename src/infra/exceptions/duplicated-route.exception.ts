import { BaseError } from "@/domain/entities";
import { AplicationError } from "@/domain/enums";

export class DuplicatedRouteException {
  static build() {
    return BaseError.build({ status: AplicationError.Status.INTERNAL_ERROR, title: 'Router map error', detail: 'Duplicated route' })
  }
}