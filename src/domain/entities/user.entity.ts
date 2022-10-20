import { Entity } from "../contracts"
import { UUID } from "../value-objects"
import { Email, Name, Password } from "../value-objects/user"
import { Veichle } from "./veichle.entity"

export type UserProps = {
  name: string
  login: string
  password: string
  veichles?: Veichle[]
}
export class User extends Entity<UserProps>{
  protected readonly _id!: UUID;

  static build(user: UserProps) {
    this.validate(user)
    const id = UUID.generate()
    return new User({ id, props: user })
  }

  private static validate(user: UserProps) {
    const { name, login, password } = user
    new Name(name)
    new Email(login)
    new Password(password)
  }

  updatePassword(password: string) {
    this.props.password = password
  }
}