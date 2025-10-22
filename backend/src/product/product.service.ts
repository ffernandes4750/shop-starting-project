// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
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
    return newItem.save();
  }

  async update(id: string, item: Product): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .lean()
      .exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }


  async delete(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.productModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
