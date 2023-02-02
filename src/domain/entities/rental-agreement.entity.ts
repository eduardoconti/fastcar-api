import { AggregateRoot } from '@domain/contracts';
import { DateVO, UUID } from '@domain/value-objects';

type Vehicle = {
  price: number;
  ownerId: string;
  id: string;
};

export type RentalAgreementStatus = 'OPEN' | 'CLOSE';
export type RentalPaymentStatus = 'PAYED' | 'CANCELED' | 'PENDING';
export type RentalAgreementProps = {
  hirer: UUID;
  vehicle: Vehicle;
  paymentStatus: RentalPaymentStatus;
  initialDate: DateVO;
  finalDate: DateVO;
  status: RentalAgreementStatus;
  value: number;
};
export type RentalAgreementPrimitiveProps = {
  hirer: string;
  paymentStatus: string;
  initialDate: Date;
  finalDate: Date;
  status: string;
  value: number;
};
export class RentalAgreement extends AggregateRoot<RentalAgreementProps> {
  protected readonly _id!: UUID;

  static create(
    props: Omit<RentalAgreementPrimitiveProps, 'paymentStatus'> & {
      vehicle: Vehicle;
    },
  ): RentalAgreement {
    const { vehicle } = props;
    return new RentalAgreement({
      id: UUID.generate(),
      props: {
        ...props,
        initialDate: new DateVO(props.initialDate),
        finalDate: new DateVO(props.finalDate),
        vehicle,
        hirer: new UUID(props.hirer),
        paymentStatus: 'PENDING',
        status: 'OPEN',
      },
    });
  }

  pay() {
    this.props.paymentStatus = 'PAYED';
  }
}
