import { DomainPrimitive, ValueObject } from '../contracts/value-object';
import { ArgumentInvalidException } from '../exceptions';

export class DateVO extends ValueObject<Date> {
  public constructor(value: Date | string | number) {
    super({ value: new Date(value) });
  }

  public get value(): Date {
    return this.props.value;
  }

  public static now(): DateVO {
    return new DateVO(Date.now());
  }

  protected validate({ value }: DomainPrimitive<Date>): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new ArgumentInvalidException('Incorrect date', value);
    }
  }
}
