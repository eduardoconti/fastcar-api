import { DomainPrimitive, ValueObject } from "@/domain/contracts/value-object";
import { ArgumentInvalidException } from "@/domain/exceptions";

export enum UserStatusEnum {
  ACTIVATED = "ACTIVATED",
  DISABLED = "DISABLED",
}

export type IUserStatus= "ACTIVATED" | "DISABLED"
export class UserStatus extends ValueObject<IUserStatus> {
  public constructor(name: IUserStatus) {
    super({ value: name });
  }

  get value(): IUserStatus {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<IUserStatus>): void {
    const validStatus: IUserStatus[] = [
      UserStatusEnum.ACTIVATED,
      UserStatusEnum.DISABLED,
    ];
    if (!validStatus.includes(value)) {
      throw new ArgumentInvalidException(
        "User status must be one of [DISABLED, ACTIVATED]"
      );
    }
  }
}
