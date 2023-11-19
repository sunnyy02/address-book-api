import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  describe('createAddress', () => {
    it('should create address', () => {
      // Arrange
      service.addressDataStore = [];
      const address = {
        id: 1,
        addressLine: '123 Queen street',
        postCode: 4000,
        state: 'QLD',
        createdDate: new Date(),
      };

      // Act
      const result = service.create(address);

      // Assert
      expect(result).toEqual(address);
      expect(service.addressDataStore).toHaveLength(1);
    });
  });
});
