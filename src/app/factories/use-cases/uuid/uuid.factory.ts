import { Uuid } from "@/app/use-cases/uuid/uuid";
import { IUuid } from "@/domain/use-cases/uuid";

export class UuidFactory {

  static build(): IUuid {
    return new Uuid()
  }
}