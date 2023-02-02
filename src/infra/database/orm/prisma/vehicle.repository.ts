import { IVehicleRepository, QueryParams } from '@domain/contracts';
import { DomainEvents } from '@domain/domain-events';
import { Vehicle, VehicleProps } from '@domain/entities';
import { Injectable } from '@nestjs/common';
import { vehicle } from '@prisma/client';
import { VehicleOrmMapper } from '../mapper';
import { PrismaService } from './prisma.service';
@Injectable()
export class VehiclePrismaRepository implements IVehicleRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async findOne(
    params: QueryParams<VehicleProps>,
  ): Promise<Vehicle | undefined> {
    const vehicle = await this.prismaClient.vehicle.findFirst({
      where: { id: params.id?.value },
      include: {
        rentalAgreement: {
          where: {
            finalDate: {
              lte: new Date(),
            },
          },
        },
      },
    });
    if (vehicle) return VehicleOrmMapper.toEntity(vehicle);
  }

  async save(entity: Vehicle): Promise<Vehicle> {
    await this.prismaClient.vehicle.create({
      data: VehicleOrmMapper.toModel(entity) as vehicle,
    });

    await DomainEvents.publishEvents(entity.id);
    return entity;
  }

  async update(entity: Vehicle): Promise<Vehicle> {
    await this.prismaClient.vehicle.update({
      data: VehicleOrmMapper.toModel(entity) as vehicle,
      where: { id: entity.id.value },
    });
    await DomainEvents.publishEvents(entity.id);
    return entity;
  }
}
