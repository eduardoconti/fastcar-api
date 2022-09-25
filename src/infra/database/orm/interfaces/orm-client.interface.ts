import { IUserRepository } from "@/app/interfaces";
export interface IOrmClient {
  userRepository: IUserRepository
  connect?(): Promise<void>;
}
