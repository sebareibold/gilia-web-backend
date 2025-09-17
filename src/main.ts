import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma automáticamente los tipos
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos implícitamente
      },
    }),
  );

  // Configuración de CORS para el frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');


  // Lanzamos el servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('='.repeat(50));
  console.log(`Servidor corriendo en http://localhost:${port}/api`);
  console.log('='.repeat(50));

}
bootstrap();
