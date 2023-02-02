import {
  RentalAgreement,
  RentalAgreementStatus,
  RentalPaymentStatus,
} from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import { RentalAgreementModel } from '@infra/database/models';

export class RentalAgreementOrmMapper {
  static toModel(entity: RentalAgreement): RentalAgreementModel {
    const {
      createdAt,
      updatedAt,
      props: {
        value,
        initialDate,
        finalDate,
        status,
        paymentStatus,
        vehicle,
        hirer,
      },
      id,
    } = entity;
    return {
      id: id.value,
      rentalAgreementStatus: status,
      value,
      initialDate: initialDate.value,
      finalDate: finalDate.value,
      paymentStatus,
      updatedAt: updatedAt.value,
      createdAt: createdAt.value,
      vehicle,
      hirerId: hirer.value,
      vehicleId: vehicle.id,
    };
  }

  static toEntity(rentalAgreement: RentalAgreementModel) {
    return new RentalAgreement({
      id: new UUID(rentalAgreement.id),
      createdAt: new DateVO(rentalAgreement.createdAt),
      props: {
        hirer: new UUID(rentalAgreement.hirerId),
        value: rentalAgreement.value,
        vehicle: rentalAgreement.vehicle,
        status: rentalAgreement.rentalAgreementStatus as RentalAgreementStatus,
        finalDate: new DateVO(rentalAgreement.finalDate),
        initialDate: new DateVO(rentalAgreement.initialDate),
        paymentStatus: rentalAgreement.paymentStatus as RentalPaymentStatus,
      },
    });
  }
}
