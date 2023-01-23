import { IVehicleRepository } from '@domain/contracts';
import { vehicleEntityMock } from '@domain/entities/mocks';
import { VehiclePrismaRepository } from '@infra/database/orm/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import {
  IRegisterVehicleUseCase,
  RegisterVehicleUseCase,
} from './register-vehicle';

const makeFakeInput = {
  owner: '58daf3da-aa8d-4dab-b226-b41d10091348',
  price: 1200,
  model: 'fakeModel',
};
describe('Register Vehicle', () => {
  let repository: IVehicleRepository;
  let useCase: IRegisterVehicleUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VehiclePrismaRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        RegisterVehicleUseCase,
      ],
    }).compile();

    repository = module.get(VehiclePrismaRepository);
    useCase = module.get(RegisterVehicleUseCase);

    jest.spyOn(repository, 'save').mockResolvedValue(vehicleEntityMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(useCase).toBeDefined();
  });

  it('should be execute successfully', async () => {
    const result = await useCase.execute(makeFakeInput);
    expect(result.isSuccess).toBeTruthy();
    expect(repository.save).toBeCalled();
  });
});
