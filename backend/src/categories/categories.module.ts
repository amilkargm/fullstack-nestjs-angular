import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  exports: [TypeOrmModule, CategoriesService],
})
export class CategoriesModule {}
