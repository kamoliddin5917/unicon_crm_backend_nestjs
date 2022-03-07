import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import CONFIG from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Uchar Team CRM API')
    .setDescription('CRM Posting CRUD api')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, doc);

  app.useStaticAssets(join(__dirname, '../public'));
  app.setGlobalPrefix('api');

  await app.listen(CONFIG.PORT || 777);
}
bootstrap();
