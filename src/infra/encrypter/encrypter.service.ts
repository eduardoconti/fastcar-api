import { IEncrypter } from '@app/interfaces';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const SALT = 15;
@Injectable()
export class EncrypterService implements IEncrypter {
  async hash(text: string, salt = SALT) {
    return await bcrypt.hash(text, salt);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
