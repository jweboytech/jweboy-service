import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ExceptionsFilter } from './filters/exceptions/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Jweboy Backend')
    .setVersion('1.0')
    .addTag('jweboy')
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     name: 'JWT',
    //     description: 'Enter JWT token',
    //     in: 'header',
    //   },
    //   'JWT-auth',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());

  await app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000/api');
  });
}
bootstrap();
