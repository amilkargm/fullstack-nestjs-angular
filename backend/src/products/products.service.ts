import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isInt } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const categoryId = createProductDto.category_id;
    if (!categoryId) {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return { product };
    } else {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      const product = this.productRepository.create({
        ...createProductDto,
        category,
      });
      await this.productRepository.save(product);
      return { product };
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });

    return { products };
  }

  async findOne(term: string) {
    let product: Product;

    if (isInt(parseInt(term, 10))) {
      product = await this.productRepository.findOneBy({
        id: parseInt(term, 10),
      });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      product = await queryBuilder
        .where('LOWER(name) =:name or LOWER(description) =:description', {
          name: term.toLowerCase(),
          description: term.toLowerCase(),
        })
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async findOnePlain(term: string) {
    const product = await this.findOne(term);
    return {
      product,
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    // , user: User
  ) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const categoryId = updateProductDto.category_id;
    if (!categoryId) {
      await this.productRepository.save(product);
      return { product };
    } else {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      this.productRepository.save({
        ...product,
        category,
      });
      return this.findOnePlain(id.toString());
    }
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Something went wrong. Please contact the admin.',
    );
  }
}
