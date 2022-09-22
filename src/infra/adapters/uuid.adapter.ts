import { IAdapter, IUuid } from "@/app/interfaces"
import {randomUUID} from "crypto"
type SlugAdapter = 'crypto'
export class UuidAdapter implements IAdapter<IUuid> {
  adapt(): IUuid {
    switch (process.env.UUID_ADAPTER as SlugAdapter) {
      case 'crypto':
        return this.cryptoUuidGenerator()
      default:
        return this.myUUidGenerator()
    }
  }

  private myUUidGenerator(): IUuid {
    return {
      v4: () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
    }
  }

  private cryptoUuidGenerator(): IUuid {
    return { v4: randomUUID }
  }
}