import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class SeedModule {}
