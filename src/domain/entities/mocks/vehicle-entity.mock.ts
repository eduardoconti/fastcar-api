import { Vehicle } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';

export const vehicleEntityMock = new Vehicle({
  id: new UUID('0c3814c6-791b-4654-b3f1-9271f455265b'),
  createdAt: DateVO.now(),
  props: {
    owner: new UUID('58daf3da-aa8d-4dab-b226-b41d10091348'),
    model: 'fake',
    price: 1200,
    status: 'AVAILABLE',
  },
});
