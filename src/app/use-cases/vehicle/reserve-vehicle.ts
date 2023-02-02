import { badRequest } from '@app/errors';
import { IVehicleRepository, Result } from '@domain/contracts';
import { Vehicle } from '@domain/entities/vehicle';
import { IUseCase } from '@domain/interfaces';
import { UUID } from '@domain/value-objects';
import { VehiclePrismaRepository } from '@infra/database/orm/prisma';
import { Inject } from '@nestjs/common';

export type ReserveVehicleUseCaseInput = {
  vehicleId: string;
  hirerId: string;
  initialDate: Date;
  finalDate: Date;
};
export type ReserveVehicleUseCaseOutput = {
  vehicleId: string;
};

export type IReserveVehicleUseCase = IUseCase<
  ReserveVehicleUseCaseInput,
  ReserveVehicleUseCaseOutput
>;
export class ReserveVehicleUseCase implements IReserveVehicleUseCase {
  constructor(
    @Inject(VehiclePrismaRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    request: ReserveVehicleUseCaseInput,
  ): Promise<Result<ReserveVehicleUseCaseOutput>> {
    const vehicle = await this.vehicleRepository.findOne({
      id: new UUID(request.vehicleId),
    });
    if (!vehicle) {
      return Result.fail(badRequest('Vehicle not found!'));
    }

    vehicle.reserve(request.initialDate, request.finalDate);
    await this.vehicleRepository.save(vehicle);
    return Result.ok({
      vehicleId: vehicle.id.value,
    });
  }
}
