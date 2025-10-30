import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsGateway } from 'src/sockets/products.gateway';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly gateway: ProductsGateway,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).lean().exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(item: Product): Promise<Product> {
    const newItem = new this.productModel(item);
    const doc = await newItem.save();

    this.gateway.emitProductsChanged({
      type: 'created',
      id: doc._id.toString(),
    });

    return doc.toObject() as unknown as Product;
  }

  async update(id: string, patch: Partial<Product>): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, patch, { new: true, runValidators: true })
      .lean()
      .exec();
    if (!updated) throw new NotFoundException('Product not found');

    this.gateway.emitProductsChanged({
      type: 'updated',
      id: String((updated as any)._id),
    });

    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.productModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) throw new NotFoundException('Product not found');

    this.gateway.emitProductsChanged({
      type: 'deleted',
      id,
    });

    return { deleted: true };
  }
}
