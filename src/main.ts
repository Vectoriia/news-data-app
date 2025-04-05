import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('News API')
    .setDescription('API для отримання та пошуку новин')
    .setVersion('1.0')
    .addTag('news')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
