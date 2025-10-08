import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novedad } from './entities/novedad.entity';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { LineaExtension } from '../lineas-extension/entities/linea-extension.entity';
import { LineaInvestigacion } from '../lineas-investigacion/entities/linea-investigacion.entity';
import { LineaInvestigacionModule } from '../lineas-investigacion/linea-investigacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Novedad, LineaExtension, LineaInvestigacion]),
    forwardRef(() => LineaInvestigacionModule),
  ],
  controllers: [NovedadesController],
  providers: [NovedadesService],
  exports: [NovedadesService, TypeOrmModule],
})
export class NovedadesModule {}
