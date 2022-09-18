import { IUserRepository } from "@/domain/interfaces";

export interface IOrmClient {
  userRepository: IUserRepository
  connect?(): Promise<void>;
}
