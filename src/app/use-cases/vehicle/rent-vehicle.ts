import { badRequest } from '@app/errors';
import { IVehicleRepository, Result } from '@domain/contracts';
import { Vehicle } from '@domain/entities/vehicle';
import { IUseCase } from '@domain/interfaces';
import { UUID } from '@domain/value-objects';
import { VehiclePrismaRepository } from '@infra/database/orm/prisma';
import { Inject } from '@nestjs/common';

export type RentVehicleUseCaseInput = {
  vehicleId: string;
  hirerId: string;
  initialDate: Date;
  finalDate: Date;
};
export type RentVehicleUseCaseOutput = {
  vehicleId: string;
};

export type IRentVehicleUseCase = IUseCase<
  RentVehicleUseCaseInput,
  RentVehicleUseCaseOutput
>;
export class RentVehicleUseCase implements IRentVehicleUseCase {
  constructor(
    @Inject(VehiclePrismaRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    request: RentVehicleUseCaseInput,
  ): Promise<Result<RentVehicleUseCaseOutput>> {
    const vehicle = await this.vehicleRepository.findOne({
      id: new UUID(request.vehicleId),
    });
    if (!vehicle) {
      return Result.fail(badRequest('Vehicle not found!'));
    }

    vehicle.rent(request.initialDate, request.finalDate);
    await this.vehicleRepository.save(vehicle);
    return Result.ok({
      vehicleId: vehicle.id.value,
    });
  }
}
