import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoriesService } from './categories.service';
import { Auth } from 'src/auth/decorators';
import { UserRole } from 'src/auth/interfaces';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
