import { IAdapter, IEncrypter } from '@/app/interfaces';
import * as bcrypt from 'bcrypt';

export class EncryptAdapter implements IAdapter<IEncrypter>{
  adapt(): IEncrypter {
    const { hash, compare } = bcrypt
    return { hash, compare }
  }
}