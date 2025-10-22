import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getAllProducts(): Product[] {
        return this.productService.getAllProducts();
    }

    @Post()
    createProduct(
        @Body('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ): Product {
        return this.productService.createProduct(id, title, description, price);
    }

    @Get(':id')
    getProductById(@Param('id') id: string): Product | undefined {
        return this.productService.getProductById(id);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string): void {
        this.productService.deleteProduct(id);
    }
}
