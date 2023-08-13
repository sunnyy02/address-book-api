import { DataSource } from 'typeorm';
import {join} from 'path';
import { AddressEntity } from '../address-book/address.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
       // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        entities: [AddressEntity],
        synchronize: configService.get('SYNCHRONIZE'),
      });

      return dataSource.initialize();
    },
  },
];