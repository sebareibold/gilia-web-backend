import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EstadoProyecto } from '../entities/proyecto.entity';

export class CreateProyectoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  fechaInicio: Date;

  @IsDateString()
  @IsOptional()
  fechaFin?: Date;

  @IsEnum(EstadoProyecto)
  @IsOptional()
  estado?: EstadoProyecto;

  @IsArray()
  @IsOptional()
  @IsUUID(undefined, { each: true })
  autoresIds?: string[];

  // @IsArray()
  // @IsOptional()
  // @IsUUID(undefined, { each: true })
  // lineasInvestigacionIds?: string[];

  // @IsArray()
  // @IsOptional()
  // @IsUUID(undefined, { each: true })
  // lineasExtensionIds?: string[];
}
