import { ID } from './id.value-object';
import { randomUUID } from "crypto"
import { ArgumentInvalidException } from '../exceptions';
import { DomainPrimitive } from '../contracts/value-object';

export class UUID extends ID {
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): UUID {
    return new UUID(randomUUID());
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (!regexExp.test(value)) {
      throw new ArgumentInvalidException('Incorrect UUID format');
    }
  }
}
