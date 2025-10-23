import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão nos DTOs
      forbidNonWhitelisted: true, // Dá erro 400 se vierem campos extra
      transform: true, // Converte automaticamente tipos (ex: "123" -> 123)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`App is running on http://localhost:${port}`);
}
bootstrap();
