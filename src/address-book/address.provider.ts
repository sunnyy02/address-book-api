import { DataSource, EntityManager } from 'typeorm';
import { AddressEntity } from './address.entity';

export const addressProvider = [
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AddressEntity),
    inject: ['DATA_SOURCE'],
  },
];
