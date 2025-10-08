import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Herramienta } from './entities/herramienta.entity';
import { HerramientasService } from './herramientas.service';
import { HerramientasController } from './herramientas.controller';
import { LineaInvestigacion } from '../lineas-investigacion/entities/linea-investigacion.entity';
import { LineaExtension } from '../lineas-extension/entities/linea-extension.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Herramienta,
      LineaInvestigacion,
      LineaExtension
    ]),
  ],
  controllers: [HerramientasController],
  providers: [HerramientasService],
  exports: [HerramientasService, TypeOrmModule],
})
export class HerramientasModule {}
