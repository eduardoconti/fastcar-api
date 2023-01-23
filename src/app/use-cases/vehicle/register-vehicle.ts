import { IVehicleRepository, Result } from '@domain/contracts';
import { Vehicle } from '@domain/entities/vehicle';
import { IUseCase } from '@domain/interfaces';
import { VehiclePrismaRepository } from '@infra/database/orm/prisma';
import { Inject } from '@nestjs/common';

export type RegisterVehicleUseCaseInput = {
  owner: string;
  model: string;
  price: number;
};

export type RegisterVehicleUseCaseOutput = {
  vehicleId: string;
};

export type IRegisterVehicleUseCase = IUseCase<
  RegisterVehicleUseCaseInput,
  RegisterVehicleUseCaseOutput
>;
export class RegisterVehicleUseCase implements IRegisterVehicleUseCase {
  constructor(
    @Inject(VehiclePrismaRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    request: RegisterVehicleUseCaseInput,
  ): Promise<Result<RegisterVehicleUseCaseOutput>> {
    const vehicle = Vehicle.create({
      ...request,
      status: 'AVAILABLE',
    });
    await this.vehicleRepository.save(vehicle);
    return Result.ok({
      vehicleId: vehicle.id.value,
    });
  }
}
