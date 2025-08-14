import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  category_id?: number;

  @IsOptional()
  @Min(0)
  @Max(1)
  status?: number;
}
