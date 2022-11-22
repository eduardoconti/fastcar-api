import { AggregateRoot } from "../contracts";
import { UserRegisteredDomainEvent } from "../events/user-registered.domain-event";
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
export class User extends AggregateRoot<UserProps> {
  protected readonly _id!: UUID;

  static create(user: UserProps) {
    const id = UUID.generate();
    const userAgg = new User({ id, props: user });
    userAgg.addEvent(
      new UserRegisteredDomainEvent({
        aggregateId: userAgg.id.value,
        login: userAgg.props.login.value,
        name: userAgg.props.name.value,
        status: userAgg.props.status.value,
      })
    );
    return userAgg;
  }

  updatePassword(password: string) {
    this.props.password = new Password(password);
  }

  confirmRegistration(): void {
    this.props.status = new UserStatus(UserStatusEnum.ACTIVATED);
  }

  isDisabled(): boolean{
    return this.props.status.value === UserStatusEnum.DISABLED
  }

  inactivateUser(){
    this.props.status = new UserStatus(UserStatusEnum.DISABLED);
  }
}
