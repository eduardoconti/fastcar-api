import { IUseCase, IUuid } from "@/domain/interfaces";
export class Uuid implements IUseCase<undefined, string> {

  constructor(
    private readonly uuidGenerator: IUuid
  ){
    
  }
  execute() {
    return this.uuidGenerator.v4()
  }
}