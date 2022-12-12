import { AggregateRoot } from "../contracts";
import { UserRegisteredDomainEvent } from "../events";
import { UUID } from "../value-objects";
import {
   Email,
   Name,
   Password,
   UserStatus,
   UserStatusEnum,
} from "../value-objects/user";

export type UserProps = {
   name: Name;
   login: Email;
   password: Password;
   status: UserStatus;
};

export type UserPrimitivesProps = {
   name: string;
   login: string;
   password: string;
   status: string;
};
export class User extends AggregateRoot<UserProps> {
   protected readonly _id!: UUID;

   static create(user: Omit<UserPrimitivesProps, "status">) {
      const id = UUID.generate();
      const { name, login, password } = user;
      const userAgg = new User({
         id,
         props: {
            name: new Name(name),
            login: new Email(login),
            password: new Password(password),
            status: new UserStatus(UserStatusEnum.DISABLED),
         },
      });
      userAgg.addEvent(
         new UserRegisteredDomainEvent({
            aggregateId: userAgg.id.value,
            login: userAgg.props.login.value,
            name: userAgg.props.name.value,
            status: userAgg.props.status.value,
         }),
      );
      return userAgg;
   }

   confirmRegistration(): void {
      this.props.status = new UserStatus(UserStatusEnum.ACTIVATED);
   }

   isDisabled(): boolean {
      return this.props.status.value === UserStatusEnum.DISABLED;
   }

   inactivateUser() {
      this.props.status = new UserStatus(UserStatusEnum.DISABLED);
   }
}
