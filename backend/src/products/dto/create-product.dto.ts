import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Majestic Vintage Mocha Overcoat',
    description: 'Nome do produto',
    maxLength: 120,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @ApiProperty({
    example: 129.99,
    description: 'Preço do produto (>= 0)',
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    example: 'Casaco comprido com estilo vintage em tom mocha.',
    description: 'Descrição curta do produto',
    maxLength: 2000,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  description!: string;
}
