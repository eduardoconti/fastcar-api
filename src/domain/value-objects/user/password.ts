import { DomainPrimitive, ValueObject } from "@/domain/contracts/value-object";
import { CreateUserException } from "@/domain/exceptions";

export class Password extends ValueObject<string> {

  public constructor(password: string) {
    super({value: password});
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (value === undefined || value === null || value.length <= 2 || value.length > 100) {
      throw CreateUserException.build('password must be greater than 2 chars and less than 100.')
    }
  }
}