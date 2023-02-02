import { VehicleModel } from './veichle.model';

export type RentalAgreementModel = {
  id: string;
  hirerId: string;
  value: number;
  rentalAgreementStatus: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt?: Date;
  initialDate: Date;
  finalDate: Date;
  vehicle: Pick<VehicleModel, 'price' | 'ownerId' | 'id'>;
  vehicleId: string;
};
