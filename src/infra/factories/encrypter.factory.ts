import { IEncrypter } from '@app/interfaces';
import { EncrypterService } from '@infra/encrypter';

export class EncrypterServiceFactory {
  static create(): IEncrypter {
    return new EncrypterService();
  }
}
