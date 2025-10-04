import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Persona } from '../personas/entities/persona.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto, Persona]),
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService, TypeOrmModule],
})
export class ProyectosModule {}
