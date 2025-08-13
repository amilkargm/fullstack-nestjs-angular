import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    CategoriesModule,
    AuthModule,
  ],
  exports: [ProductsService, TypeOrmModule], // Exporting ProductsService and TypeOrm
})
export class ProductsModule {}
