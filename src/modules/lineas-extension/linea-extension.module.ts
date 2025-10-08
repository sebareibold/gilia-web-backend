import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaExtension } from './entities/linea-extension.entity';
import { LineaExtensionService } from './linea-extension.service';
import { LineaExtensionController } from './linea-extension.controller';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Herramienta } from '../herramientas/entities/herramienta.entity';
import { Novedad } from '../novedades/entities/novedad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineaExtension,
      Proyecto,
      Herramienta,
      Novedad
    ]),
  ],
  controllers: [LineaExtensionController],
  providers: [LineaExtensionService],
  exports: [LineaExtensionService, TypeOrmModule],
})
export class LineaExtensionModule {}
