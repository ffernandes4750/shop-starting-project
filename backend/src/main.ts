import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS com credenciais
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });

  // Cookies
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão nos DTOs
      forbidNonWhitelisted: true, // Dá erro 400 se vierem campos extra
      transform: true, // Converte automaticamente tipos (ex: "123" -> 123)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ---- Swagger (OpenAPI) ----
  // Documento INTERNO: inclui tudo (admin, debug, etc.)
  const internalConfig = new DocumentBuilder()
    .setTitle('Elegant Context API — Interna')
    .setDescription('Documentação completa para developers')
    .setVersion('v1')
    .addCookieAuth('accessToken', {
      type: 'apiKey',
      in: 'cookie',
      description: 'JWT enviado em cookie httpOnly',
    })
    .build();

  const internalDoc = SwaggerModule.createDocument(app, internalConfig);
  SwaggerModule.setup('docs', app, internalDoc, {
    swaggerOptions: { withCredentials: true },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`App is running on http://localhost:${port}`);
}
bootstrap();
