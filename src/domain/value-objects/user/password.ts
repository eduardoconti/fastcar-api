import { DomainPrimitive, ValueObject } from "@domain/contracts/value-object";
import { ArgumentInvalidException } from "@domain/exceptions";

export class Password extends ValueObject<string> {
   public constructor(password: string) {
      super({ value: password });
   }

   get value(): string {
      return this.props.value;
   }

   protected validate({ value }: DomainPrimitive<string>): void {
      if (!value.match(/^\$2[ayb]\$.{56}$/)) {
         throw new ArgumentInvalidException(
            "invalid password hash",
            value,
         );
      }
   }
}
