import { DataSource } from 'typeorm';
import {join} from 'path';
import { AddressEntity } from 'src/address-book/address.entity';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'AddressBook',
        // entities: [
        //     __dirname + '/../**/*.entity{.ts,.js}',
        // ],
       // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        entities: [AddressEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];