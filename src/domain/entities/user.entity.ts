import { CreateUserException } from "../exceptions"
import { Veichle } from "./veichle.entity"

export class User {
  id?: string
  name!: string
  login!: string
  password!: string
  veichles?: Veichle[]

  private constructor(user: Partial<User>) {
    Object.assign(this, user)
  }

  static build(user: Partial<User>) {
    this.validate(user)
    return new User(user)
  }

  private static validate(user: Partial<User>) {
    const { name } = user
    this.validateName(name)
  }

  private static validateName(name?: string) {
    if (!name) {
      throw new CreateUserException('name must be not empty')
    }
    if (name?.length < 6) {
      throw new CreateUserException('name mus be a 6 caracteres')
    }
  }
}