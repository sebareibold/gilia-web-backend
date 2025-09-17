import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gilia.db',     // archivo donde se guarda la base
      autoLoadEntities: true,   // carga todas las entidades decoradas con @Entity()
      synchronize: true,        // crea/modifica tablas automáticamente según las entidades
      logging: true,            // muestra en consola el SQL que ejecuta
    }),
    
  ],
})
export class AppModule {}
