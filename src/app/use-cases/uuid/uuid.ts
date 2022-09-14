import { IUuid } from "@/domain/use-cases/uuid";
import * as crypto from "crypto"
export class Uuid implements IUuid {
  uuidV4() {
    return crypto.randomUUID()
  }
}