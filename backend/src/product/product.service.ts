import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    getAllProducts(): Product[] {
        return this.products;
    }

    createProduct(id: string, title: string, description: string, price: number): Product {
        const newProduct: Product = {
            id,
            title,
            description,
            price,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    deleteProduct(id: string): void {
        this.products = this.products.filter(product => product.id !== id);
    }
}

