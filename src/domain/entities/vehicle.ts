import { AggregateRoot } from '@domain/contracts';
import { ArgumentInvalidException } from '@domain/exceptions';
import { DateVO, UUID } from '@domain/value-objects';

export type VehicleStatus = 'AVAILABLE' | 'DISABLED';
type RentalInformantionStatus = 'RENTED' | 'RESERVED';
export type RentalInformantion = {
  status: RentalInformantionStatus;
  initialDate?: DateVO;
  finalDate?: DateVO;
};
export type VehicleProps = {
  owner: UUID;
  status: VehicleStatus;
  price: number;
  model: string;
  rentalInformation?: RentalInformantion;
};
export type VehiclePrimitiveProps = {
  owner: string;
  status: VehicleStatus;
  price: number;
  model: string;
};
export class Vehicle extends AggregateRoot<VehicleProps> {
  protected readonly _id!: UUID;

  static create(
    props: Omit<VehiclePrimitiveProps, 'rentalAgreement'>,
  ): Vehicle {
    return new Vehicle({
      id: UUID.generate(),
      props: { ...props, owner: new UUID(props.owner) },
    });
  }

  reserve(initialDate: Date, finalDate: Date) {
    if (this.isDisabled()) {
      throw new ArgumentInvalidException('the vehicle is disabled!');
    }

    if (this.isRented()) {
      throw new ArgumentInvalidException('the vehicle is already rented!');
    }

    this.props.rentalInformation = {
      status: 'RESERVED',
      initialDate: new DateVO(initialDate),
      finalDate: new DateVO(finalDate),
    };
  }

  rent() {
    if (this.isDisabled()) {
      throw new ArgumentInvalidException('the vehicle is disabled!');
    }

    if (this.isRented()) {
      throw new ArgumentInvalidException('the vehicle is already rented!');
    }

    if (!this.isReserved() || !this.props.rentalInformation) {
      throw new ArgumentInvalidException('the vehicle is not reserved!');
    }
    this.props.rentalInformation.status = 'RENTED';
  }

  isRented() {
    return (
      this.props.rentalInformation &&
      this.props.rentalInformation.status === 'RENTED'
    );
  }

  isReserved() {
    return (
      this.props.rentalInformation &&
      this.props.rentalInformation.status === 'RESERVED'
    );
  }

  isDisabled() {
    return this.props.status === 'DISABLED';
  }

  calculateRentValue(initialDate: Date, finalDate: Date): number {
    const ONE_DAY_HOURS = 24;
    const MIN_RENTAL_HOURS = 6;
    if (initialDate > finalDate) {
      throw new ArgumentInvalidException(
        'the inital date cannot be greater than the final date!',
      );
    }
    const rentalHours =
      (finalDate.getMilliseconds() - initialDate.getMilliseconds()) *
      1000 *
      60 *
      60;
    if (rentalHours <= MIN_RENTAL_HOURS) {
      throw new ArgumentInvalidException(
        `rental hours cannot be less than ${MIN_RENTAL_HOURS} hours!`,
      );
    }

    const rentalDays = Math.ceil(rentalHours / ONE_DAY_HOURS);

    return rentalDays * this.props.price;
  }
}
