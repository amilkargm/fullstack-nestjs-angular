import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isInt } from 'class-validator';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return { category };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    return { categories };
  }

  async findOne(term: string) {
    let category: Category;

    if (isInt(parseInt(term, 10))) {
      category = await this.categoryRepository.findOneBy({
        id: parseInt(term, 10),
      });
    } else {
      const queryBuilder =
        this.categoryRepository.createQueryBuilder('category');
      category = await queryBuilder
        .where('LOWER(name) =:name or LOWER(description) =:description', {
          name: term.toLowerCase(),
          description: term.toLowerCase(),
        })
        .getOne();
    }

    if (!category)
      throw new NotFoundException(`Category with ${term} not found`);

    return category;
  }

  async findOnePlain(term: string) {
    const category = await this.findOne(term);
    return {
      category,
    };
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    // , user: User
  ) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category)
      throw new NotFoundException(`Category with id: ${id} not found`);
    try {
      await this.categoryRepository.save(category);
      return this.findOnePlain(id.toString());
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Something went wrong. Please contact the admin.',
    );
  }
}
