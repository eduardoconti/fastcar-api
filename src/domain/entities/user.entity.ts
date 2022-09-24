import { CreateUserException } from "../exceptions"
import { Veichle } from "./veichle.entity"

export class User {
  id!: string
  name!: string
  login!: string
  password!: string
  veichles?: Veichle[]

  private constructor(user: Partial<User>) {
    const { id, name, login, password, veichles } = user
    Object.assign(this, { id, name, login, password, veichles })
  }

  static build(user: User) {
    this.validate(user)
    return new User(user)
  }

  private static validate(user: Partial<User>) {
    const { name, login, password } = user
    this.validateName(name)
    this.validateEmail(login)
    this.validatePassword(password)
  }

  private static validateName(name?: string) {
    if (!name) {
      throw CreateUserException.build('name must be not empty')
    }
    if (name?.length < 2) {
      throw CreateUserException.build('name must be a 2 caracteres')
    }
  }

  private static validateEmail(email?: string) {
    if (!email) {
      throw CreateUserException.build('email must be not empty')
    }
    const string = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    if (!string) {
      throw CreateUserException.build('invalid email')
    }
  }

  private static validatePassword(password?: string) {
    if (!password) {
      throw CreateUserException.build('password must be not empty')
    }
  }
}