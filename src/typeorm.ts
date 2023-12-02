import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { AddressEntity } from "./common/entities/address.entity";
import { ContactEntity } from "./common/entities/contact.entity";
import { RoleEntity } from "./common/entities/role.entity";
import { StateEntity } from "./common/entities/state.entity";
import { UserEntity } from "./common/entities/user.entity";
import { InitDatabase1692783883190 } from "./migration/1692783883190-InitDatabase";


dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

const config = {
    type: 'mysql',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    autoLoadEntities: true,
    synchronize: `${process.env.SYNCHRONIZE}` === 'true',
    // we set it to false in the .env.dev file
  };

  const {autoLoadEntities,synchronize ,...otherConfigs} = config;
  const migrationConfig = {
    ...otherConfigs,
    migrations: [InitDatabase1692783883190],
    entities: [AddressEntity, UserEntity, ContactEntity,
               RoleEntity, StateEntity]
  };
  export default registerAs('OrmConfig', ()=> config );
  export const connectionSource = 
      new DataSource(migrationConfig as DataSourceOptions);