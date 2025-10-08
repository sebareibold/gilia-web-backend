import { IsDateString, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateNovedadDto {
  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsUUID()
  @IsOptional()
  lineaExtensionId?: string;

  @IsUUID()
  @IsOptional()
  lineaInvestigacionId?: string;
}
