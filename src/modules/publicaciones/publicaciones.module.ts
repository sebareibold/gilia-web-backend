import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { Persona } from '../personas/entities/persona.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion, Persona]),
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
  exports: [PublicacionesService, TypeOrmModule],
})
export class PublicacionesModule {}
