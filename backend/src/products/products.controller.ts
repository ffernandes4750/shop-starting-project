import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

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
  // Body esperado: { "name": "...", "price": 123.45, "description": "..." }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.productsService.delete(id);
  }
}
