import * as bcrypt from 'bcrypt';
import { Result } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";

export interface ICompareHashUseCaseRequestDTO {
  text: string,
  hash: string,
}
export class CompareHashUseCase implements IUseCase<ICompareHashUseCaseRequestDTO, Result<boolean>> {

  async execute(request: ICompareHashUseCaseRequestDTO): Promise<Result<boolean>> {
    const { text, hash } = request
    const confirm = await bcrypt.compare(text, hash);

    if (!confirm) {
      Result.fail({ status: 404, title: 'Falha ao comparar hash' })
    }
    return Result.ok(confirm);
  }
}
