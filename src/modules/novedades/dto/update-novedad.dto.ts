import { PartialType } from '@nestjs/mapped-types';
import { CreateNovedadDto } from './create-novedad.dto';

export class UpdateNovedadDto extends PartialType(CreateNovedadDto) {}
