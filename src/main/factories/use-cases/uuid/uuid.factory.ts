
import { Uuid } from "@/app/use-cases/uuid";
import { UuidAdapter } from "@/main/adapters";
export class UuidFactory {

  static build(): Uuid {
    return new Uuid(new UuidAdapter().adapt())
  }
}