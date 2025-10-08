import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaInvestigacion } from './entities/linea-investigacion.entity';
import { LineaInvestigacionService } from './linea-investigacion.service';
import { LineaInvestigacionController } from './linea-investigacion.controller';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Herramienta } from '../herramientas/entities/herramienta.entity';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';
import { Novedad } from '../novedades/entities/novedad.entity';
import { HerramientasModule } from '../herramientas/herramientas.module';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { PublicacionesModule } from '../publicaciones/publicaciones.module';
import { NovedadesModule } from '../novedades/novedades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineaInvestigacion,
      Proyecto,
      Herramienta,
      Publicacion,
      Novedad
    ]),
    forwardRef(() => HerramientasModule),
    forwardRef(() => ProyectosModule),
    forwardRef(() => PublicacionesModule),
    forwardRef(() => NovedadesModule),
  ],
  controllers: [LineaInvestigacionController],
  providers: [LineaInvestigacionService],
  exports: [LineaInvestigacionService, TypeOrmModule],
})
export class LineaInvestigacionModule {}
