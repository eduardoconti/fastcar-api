import { IUseCase, IUuid } from "@/domain/interfaces";
export class UuidUseCase implements IUseCase<undefined, string> {

  constructor(
    readonly uuidGenerator: IUuid
  ){   
  }

  execute() {
    return this.uuidGenerator.v4()
  }
}