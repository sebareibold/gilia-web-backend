import { IsArray, IsEnum, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { EstadoLineaInvestigacion } from '../entities/linea-investigacion.entity';

export class CreateLineaInvestigacionDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  imagenes?: string[];

  @IsEnum(EstadoLineaInvestigacion)
  @IsOptional()
  estado?: EstadoLineaInvestigacion;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  proyectosIds?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  herramientasIds?: string[];
}
