import { ICommand } from "@domain/interfaces";
import * as nanoid from "nanoid";

export abstract class Command implements ICommand {
   public guid: string;

   constructor(guid?: string) {
      this.guid = guid || nanoid.nanoid();
   }
}