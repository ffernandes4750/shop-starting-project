import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Role = 'admin' | 'user';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  email!: string;

  @Prop({ type: String, required: true, trim: true })
  name!: string;

  @Prop({
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  })
  role!: Role;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({
    type: String,
    required: true,
    enum: ['active', 'blocked'],
    default: 'active',
  })
  status!: 'active' | 'blocked';
}

export const UserSchema = SchemaFactory.createForClass(User);
