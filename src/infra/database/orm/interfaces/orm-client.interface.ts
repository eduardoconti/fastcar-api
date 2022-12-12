import { IUserRepository } from "@domain/contracts";

export interface IOrmClient {
   userRepository: IUserRepository;
   connect?(): Promise<void>;
}
