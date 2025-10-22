import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('✅ connected'));
        connection.on('open', () => console.log('✅ open'));
        connection.on('disconnected', () => console.log('⚠️ disconnected'));
        connection.on('reconnected', () => console.log('♻️ reconnected'));
        connection.on('disconnecting', () => console.log('⛔ disconnecting'));
        return connection;
      },
    }),

    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
