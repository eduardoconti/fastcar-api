import { Vehicle, VehicleStatus } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import { VehicleModel } from '@infra/database/models';

export class VehicleOrmMapper {
  static toModel(entity: Vehicle): VehicleModel {
    const {
      createdAt,
      updatedAt,
      props: { price, model, status, owner, rentalInformation },
      id,
    } = entity;
    return {
      id: id.value,
      status,
      price,
      ownerId: owner.value,
      model,
      updatedAt: updatedAt.value,
      createdAt: createdAt.value,
      rentalAgreement: rentalInformation,
    };
  }

  static toEntity(vehicle: VehicleModel) {
    return new Vehicle({
      id: new UUID(vehicle.id),
      createdAt: new DateVO(vehicle.createdAt),
      props: {
        price: vehicle.price,
        owner: new UUID(vehicle.ownerId),
        model: vehicle.model,
        status: vehicle.status as VehicleStatus,
      },
    });
  }
}
