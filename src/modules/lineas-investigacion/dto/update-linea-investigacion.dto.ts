import { PartialType } from '@nestjs/mapped-types';
import { CreateLineaInvestigacionDto } from './create-linea-investigacion.dto';

export class UpdateLineaInvestigacionDto extends PartialType(CreateLineaInvestigacionDto) {}
