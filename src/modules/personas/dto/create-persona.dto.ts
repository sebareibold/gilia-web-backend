// create-persona.dto.ts
import { IsBoolean, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreatePersonaDto {
  @IsNumber()
  dni: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsString()
  telefono: string;

  @IsString()
  linkLinkedin: string;

  @IsString()
  linkGitHub: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean = true;  // por defecto activo

  @IsOptional()
  publicaciones?: number[];

  @IsOptional()
  proyectos?: number[];
}
