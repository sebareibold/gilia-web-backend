import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { Novedad } from './entities/novedad.entity';
import { CreateNovedadDto } from './dto/create-novedad.dto';
import { UpdateNovedadDto } from './dto/update-novedad.dto';
import { LineaExtension } from '../lineas-extension/entities/linea-extension.entity';
import { LineaInvestigacionService } from '../lineas-investigacion/linea-investigacion.service';

@Injectable()
export class NovedadesService {
  private readonly logger = new Logger('NovedadesService');

  constructor(
    @InjectRepository(Novedad)
    private readonly novedadRepository: Repository<Novedad>,
    @InjectRepository(LineaExtension)
    private readonly lineaExtensionRepository: Repository<LineaExtension>,
    private moduleRef: ModuleRef,
  ) {}

  /**
   * Crea una nueva novedad
   * @param createNovedadDto - Datos para crear la novedad
   * @returns La novedad creada
   */
  async create(createNovedadDto: CreateNovedadDto) {
    try {
      const { lineaExtensionId, lineaInvestigacionId, ...novedadData } = createNovedadDto;
      
      // Verificar que se proporcione al menos una relación
      if (!lineaExtensionId && !lineaInvestigacionId) {
        throw new BadRequestException('Debe proporcionar al menos un ID de línea de extensión o línea de investigación');
      }

      const novedad = this.novedadRepository.create(novedadData);

      // Asignar línea de extensión si se proporciona
      if (lineaExtensionId) {
        const lineaExtension = await this.lineaExtensionRepository.findOne({
          where: { id: lineaExtensionId },
        });

        if (!lineaExtension) {
          throw new BadRequestException(`Línea de extensión con ID "${lineaExtensionId}" no encontrada`);
        }
        novedad.lineaExtension = lineaExtension;
      }

      // Asignar línea de investigación si se proporciona
      if (lineaInvestigacionId) {
        const lineasInvestigacionService = this.moduleRef.get(LineaInvestigacionService, { strict: false });
        const lineaInvestigacion = await lineasInvestigacionService.findOne(lineaInvestigacionId);
        novedad.lineaInvestigacion = lineaInvestigacion;
      }


      await this.novedadRepository.save(novedad);
      return novedad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todas las novedades
   * @returns Lista de novedades
   */
  async findAll() {
    return await this.novedadRepository.find({
      relations: ['lineaExtension'],
    });
  }

  /**
   * Busca una novedad por su ID
   * @param id - ID de la novedad a buscar
   * @returns La novedad encontrada
   */
  async findOne(id: string) {
    const novedad = await this.novedadRepository.findOne({
      where: { id },
      relations: ['lineaExtension'],
    });

    if (!novedad) {
      throw new NotFoundException(`Novedad con ID "${id}" no encontrada`);
    }

    return novedad;
  }

  /**
   * Actualiza una novedad existente
   * @param id - ID de la novedad a actualizar
   * @param updateNovedadDto - Datos para actualizar la novedad
   * @returns La novedad actualizada
   */
  async update(id: string, updateNovedadDto: UpdateNovedadDto) {
    const novedad = await this.findOne(id);
    
    // Actualizar línea de extensión si se proporciona
    if (updateNovedadDto.lineaExtensionId !== undefined) {
      if (updateNovedadDto.lineaExtensionId === null) {
        novedad.lineaExtension = null;
      } else {
        const lineaExtension = await this.lineaExtensionRepository.findOne({
          where: { id: updateNovedadDto.lineaExtensionId },
        });

        if (!lineaExtension) {
          throw new BadRequestException(
            `Línea de extensión con ID "${updateNovedadDto.lineaExtensionId}" no encontrada`,
          );
        }
        
        novedad.lineaExtension = lineaExtension;
      }
      delete updateNovedadDto.lineaExtensionId;
    }

    // Actualizar línea de investigación si se proporciona
    if (updateNovedadDto.lineaInvestigacionId !== undefined) {
      if (updateNovedadDto.lineaInvestigacionId === null) {
        novedad.lineaInvestigacion = null;
      } else {
        const lineasInvestigacionService = this.moduleRef.get(LineaInvestigacionService, { strict: false });
        const lineaInvestigacion = await lineasInvestigacionService.findOne(updateNovedadDto.lineaInvestigacionId);
        novedad.lineaInvestigacion = lineaInvestigacion;
      }
      delete updateNovedadDto.lineaInvestigacionId;
    }

    Object.assign(novedad, updateNovedadDto);
    
    try {
      await this.novedadRepository.save(novedad);
      return novedad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina una novedad por su ID (soft delete)
   * @param id - ID de la novedad a eliminar
   * @returns La novedad eliminada
   */
  async remove(id: string) {
    const novedad = await this.findOne(id);
    await this.novedadRepository.softRemove(novedad);
    return novedad;
  }

  /**
   * Maneja las excepciones de la base de datos
   * @param error - Error capturado
   */
  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verifica los logs del servidor',
    );
  }
}
