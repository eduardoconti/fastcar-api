import { BaseError } from "@/domain/entities";
import { Aplication } from "@/domain/enums";

export class DuplicatedRouteException {
  static build() {
    return BaseError.build({ status: Aplication.Status.INTERNAL_ERROR, title: 'Router map error', detail: 'Duplicated route' })
  }
}