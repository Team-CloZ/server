import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import customCss from './customCss';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('CloZ API').setVersion('0.1').build(),
  );
  const options = {
    customCss,
  };
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
