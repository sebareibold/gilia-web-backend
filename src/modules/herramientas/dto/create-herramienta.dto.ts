import { IsArray, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateHerramientaDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsUrl()
  @IsOptional()
  enlace?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  lineasInvestigacionIds?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  lineasExtensionIds?: string[];
}
