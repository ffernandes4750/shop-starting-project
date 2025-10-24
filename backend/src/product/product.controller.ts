import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './DTOs/create-product.dto';
import { UpdateProductDto } from './DTOs/update-product.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // POST /products
  // Body esperado: { "title": "...", "price": 123.45, "description": "..." }
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  // PATCH /products/:id
  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.productsService.delete(id);
  }
}
