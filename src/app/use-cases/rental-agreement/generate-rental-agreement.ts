import { badRequest } from '@app/errors';
import { IVehicleRepository, Result } from '@domain/contracts';
import { IUseCase } from '@domain/interfaces';
import { UUID } from '@domain/value-objects';
import { VehiclePrismaRepository } from '@infra/database/orm/prisma';
import { Inject } from '@nestjs/common';

export type GenerateRentalAgreementUseCaseInput = {
  vehicleId: string;
  hirerId: string;
  initialDate: Date;
  finalDate: Date;
};
export type GenerateRentalAgreementUseCaseOutput = {
  vehicleId: string;
};

export type IGenerateRentalAgreementUseCase = IUseCase<
  GenerateRentalAgreementUseCaseInput,
  GenerateRentalAgreementUseCaseOutput
>;
export class GenerateRentalAgreementUseCase
  implements IGenerateRentalAgreementUseCase
{
  constructor(
    @Inject(VehiclePrismaRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    request: GenerateRentalAgreementUseCaseInput,
  ): Promise<Result<GenerateRentalAgreementUseCaseOutput>> {
    const vehicle = await this.vehicleRepository.findOne({
      id: new UUID(request.vehicleId),
    });
    if (!vehicle) {
      return Result.fail(badRequest('Vehicle not found!'));
    }

    const rentalValue = vehicle.calculateRentValue(
      request.initialDate,
      request.finalDate,
    );
    //await this.vehicleRepository.save(vehicle);
    return Result.ok({
      vehicleId: vehicle.id.value,
    });
  }
}
