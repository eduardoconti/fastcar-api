import { IAdapter, IEncrypter } from '@/app/interfaces';
import * as bcrypt from 'bcrypt';

const SALT = 15
export class EncrypterAdapter implements IAdapter<IEncrypter>{
  adapt(): IEncrypter {
    const { hash, compare } = bcrypt
    return { hash: (text: string, salt = SALT) => hash(text, salt), compare }
  }
}