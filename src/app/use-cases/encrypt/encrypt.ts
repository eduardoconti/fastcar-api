import { Result } from '@/domain/entities';
import { IEncrypter, IUseCase } from '@/domain/interfaces';
import { EncryptUseCaseInput, EncryptUseCaseOutput } from './encrypt.dto';

const SALT = 15
export class EncryptUseCase implements IUseCase<EncryptUseCaseInput, Result<EncryptUseCaseOutput>> {
  constructor(
    readonly encrypter: IEncrypter
  ) {

  }
  async execute(text: EncryptUseCaseInput): Promise<Result<EncryptUseCaseOutput>> {
    return Result.ok(await this.encrypter.hash(text, SALT));
  }
}
