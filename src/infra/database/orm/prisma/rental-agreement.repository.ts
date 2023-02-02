import { IRentalAgreementRepository, QueryParams } from '@domain/contracts';
import { DomainEvents } from '@domain/domain-events';
import { RentalAgreement, RentalAgreementProps } from '@domain/entities';
import { Injectable } from '@nestjs/common';
import { rentalAgreement } from '@prisma/client';
import { RentalAgreementOrmMapper } from '../mapper';
import { PrismaService } from './prisma.service';
@Injectable()
export class RentalAgreementPrismaRepository
  implements IRentalAgreementRepository
{
  constructor(private readonly prismaClient: PrismaService) {}

  async findOne(
    params: QueryParams<RentalAgreementProps>,
  ): Promise<RentalAgreement | undefined> {
    const rentalAgreement = await this.prismaClient.rentalAgreement.findUnique({
      where: { id: params.id?.value },
      include: {
        vehicle: true,
      },
    });
    if (rentalAgreement)
      return RentalAgreementOrmMapper.toEntity(rentalAgreement);
  }

  async save(entity: RentalAgreement): Promise<RentalAgreement> {
    await this.prismaClient.rentalAgreement.create({
      data: RentalAgreementOrmMapper.toModel(entity) as rentalAgreement,
    });

    await DomainEvents.publishEvents(entity.id);
    return entity;
  }

  async update(entity: RentalAgreement): Promise<RentalAgreement> {
    await this.prismaClient.rentalAgreement.update({
      data: RentalAgreementOrmMapper.toModel(entity) as rentalAgreement,
      where: { id: entity.id.value },
    });
    await DomainEvents.publishEvents(entity.id);
    return entity;
  }
}
