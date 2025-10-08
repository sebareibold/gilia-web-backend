import { PartialType } from '@nestjs/mapped-types';
import { CreateLineaExtensionDto } from './create-linea-extension.dto';

export class UpdateLineaExtensionDto extends PartialType(CreateLineaExtensionDto) {}
