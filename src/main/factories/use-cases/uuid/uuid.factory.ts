
import { UuidUseCase } from "@/app/use-cases/uuid";
import { UuidAdapter } from "@/main/adapters";
export class UuidFactory {

  static build(): UuidUseCase {
    return new UuidUseCase(new UuidAdapter().adapt())
  }
}