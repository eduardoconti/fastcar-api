import { IEncrypter } from "@/domain/interfaces";
import * as bcrypt from 'bcrypt';

export class BcryptAdapter {
  static adapt(): IEncrypter {
    const { hash, compare } = bcrypt
    return { hash, compare }
  }
}