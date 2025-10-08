import { PartialType } from '@nestjs/mapped-types';
import { CreateHerramientaDto } from './create-herramienta.dto';

export class UpdateHerramientaDto extends PartialType(CreateHerramientaDto) {}
