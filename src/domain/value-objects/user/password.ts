import { DomainPrimitive, ValueObject } from "@/domain/contracts/value-object";
import { ArgumentInvalidException } from "@/domain/exceptions";

export class Password extends ValueObject<string> {
  public constructor(password: string) {
    super({ value: password });
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (value.length < 6 || value.length > 100) {
      throw new ArgumentInvalidException(
        "password must be greater than 6 chars and less than 100."
      );
    }
  }
}
