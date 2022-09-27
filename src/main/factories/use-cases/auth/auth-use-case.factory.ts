import { AuthUseCase } from "@/app/use-cases/auth";
import { EncrypterAdapter, JwtAdapter } from "@/infra/adapters";
import { IOrmClient } from "@/infra/database/orm/interfaces";

export class AuthUseCaseFactory {
  
  static build(orm: IOrmClient) {
    const jwtService = new JwtAdapter().adapt()
    const ecnrypter = new EncrypterAdapter().adapt()

    return new AuthUseCase(jwtService, orm.userRepository, ecnrypter)
  }
}