import { IEncrypter } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { CompareHashUseCaseInput, CompareHashUseCaseOutput } from "./compare-hash.dto";
export class CompareHashUseCase implements IUseCase<CompareHashUseCaseInput, Result<CompareHashUseCaseOutput>> {

  constructor(
    private readonly encrypter: IEncrypter
  ) {

  }
  async execute(request: CompareHashUseCaseInput): Promise<Result<CompareHashUseCaseOutput>> {
    const { text, hash } = request
    const confirm = await this.encrypter.compare(text, hash);

    if (!confirm) {
      Result.fail({ status: 404, title: 'Falha ao comparar hash' })
    }
    return Result.ok(confirm);
  }
}
