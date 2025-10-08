import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Persona } from '../personas/entities/persona.entity';
import { LineaInvestigacion } from '../lineas-investigacion/entities/linea-investigacion.entity';
import { LineaExtension } from '../lineas-extension/entities/linea-extension.entity';
import { LineaInvestigacionModule } from '../lineas-investigacion/linea-investigacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proyecto, 
      Persona, 
      LineaInvestigacion,
      LineaExtension
    ]),
    forwardRef(() => LineaInvestigacionModule),
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService, TypeOrmModule],
})
export class ProyectosModule {}
