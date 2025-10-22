// products.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './product.schema';

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
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // POST /products
  // Body esperado: { "title": "...", "price": 123.45, "description": "..." }
  @Post()
  async create(
    @Body() body: any,
  ): Promise<Product> {
    const { title, price, description } = body ?? {};
    return this.productsService.create({ title, price, description } as any);
  }

  // PATCH /products/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ): Promise<Product> {
    const { title, price, description } = body ?? {};
    return this.productsService.update(id, { title, price, description } as any);
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.delete(id);
  }
}
