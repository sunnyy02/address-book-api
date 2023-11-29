import { Module } from '@nestjs/common';
import { DBSeedingService } from './db-seeding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [DBSeedingService],
  exports: [DBSeedingService],
})
export class CommonModule {}
