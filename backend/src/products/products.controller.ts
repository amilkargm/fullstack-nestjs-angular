import { Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto';
import { Auth } from 'src/auth/decorators';
import { UserRole } from 'src/auth/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
