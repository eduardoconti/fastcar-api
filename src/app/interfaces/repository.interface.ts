import { IFindMany, IFindOne, ISave } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
export interface IUserRepository
  extends ISave<User>,
    IFindOne<User, UserProps>,
    IFindMany<User, UserProps> {
  update(user: User): Promise<User> | User;
}
