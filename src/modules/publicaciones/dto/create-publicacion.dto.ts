import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePublicacionDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsString()
  medio_de_publicacion: string;

  @IsString()
  link: string;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  autoresIds?: string[];

  // @IsUUID()
  // @IsOptional()
  // lineaInvestigacionId?: string;

  // @IsUUID()
  // @IsOptional()
  // lineaExtensionId?: string;
}
