import { AggregateRoot } from "../contracts"
import { UUID } from "../value-objects"
import { Email, Name, Password } from "../value-objects/user"

export type UserProps = {
  name: Name
  login: Email
  password: Password
}
export class User extends AggregateRoot<UserProps>{
  protected readonly _id!: UUID;

  static create(user: UserProps) {
    const id = UUID.generate()
    return new User({ id, props: user })
  }

  updatePassword(password: string) {
    this.props.password = new Password(password)
  }
}