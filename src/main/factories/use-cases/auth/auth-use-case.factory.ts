import { AuthUseCase } from "@/app/use-cases/auth";
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface";
import { CompareHashUseCase, EncryptUseCase } from "@/infra/encrypt";
import { JwtService } from "@/infra/jwt";
import { EncryptAdapter } from "@/main/adapters";

export class AuthUseCaseFactory {
  static build(orm: IOrmClient) {
    const jwtService = new JwtService()
    const compareHashUseCase = new CompareHashUseCase(
      new EncryptAdapter().adapt()
    )
    return new AuthUseCase(jwtService, orm.userRepository, compareHashUseCase)
  }
}