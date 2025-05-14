import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }); // Habilita CORS para permitir solicitudes de diferentes dominios
  await app.listen(process.env.PUERTO ?? 4000);
}
bootstrap();
