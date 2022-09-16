import * as bcrypt from 'bcrypt';
import { Result } from '@/domain/entities';
import { IUseCase } from '@/domain/interfaces';

export class EncryptUseCase implements IUseCase<string, Result<string>> {
  async execute(text: string): Promise<Result<string>> {
    return Result.ok(await bcrypt.hash(text, 15));
  }
}
