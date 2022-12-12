import { IEncrypter } from "@app/interfaces";
import * as bcrypt from "bcrypt";

const SALT = 15;
export class EncrypterServiceFactory {
   static create(): IEncrypter {
      const { hash, compare } = bcrypt;
      return { hash: (text: string, salt = SALT) => hash(text, salt), compare };
   }
}
