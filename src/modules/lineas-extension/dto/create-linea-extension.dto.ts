import { IsArray, IsEnum, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { EstadoLineaExtension } from '../entities/linea-extension.entity';

export class CreateLineaExtensionDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  imagenes?: string[];

  @IsEnum(EstadoLineaExtension)
  @IsOptional()
  estado?: EstadoLineaExtension;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  proyectosIds?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  herramientasIds?: string[];
}
