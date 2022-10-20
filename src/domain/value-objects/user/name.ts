import { DomainPrimitive, ValueObject } from "@/domain/contracts/value-object";
import { CreateUserException } from "@/domain/exceptions";

export class Name extends ValueObject<string> {

  public constructor(name: string) {
    super({value: name});
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (value === undefined || value === null || value.length <= 2 || value.length > 100) {
      throw CreateUserException.build('User must be greater than 2 chars and less than 100.')
    }
  }
}