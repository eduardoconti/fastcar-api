import { DomainEvent, DomainEventProps } from "../domain-events";

export class UserRegisteredDomainEvent extends DomainEvent {
   constructor(props: DomainEventProps<UserRegisteredDomainEvent>) {
      super(props);
      this.name = props.name;
      this.login = props.login;
      this.status = props.status;
   }

   readonly name: string;

   readonly login: string;

   readonly status: string;
}
