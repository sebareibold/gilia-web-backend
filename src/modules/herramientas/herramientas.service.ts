import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './entities/herramienta.entity';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';
import { LineaInvestigacion } from '../lineas-investigacion/entities/linea-investigacion.entity';
import { LineaExtension } from '../lineas-extension/entities/linea-extension.entity';

@Injectable()
export class HerramientasService {
  private readonly logger = new Logger('HerramientasService');

  constructor(
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
    @InjectRepository(LineaInvestigacion)
    private readonly lineaInvestigacionRepository: Repository<LineaInvestigacion>,
    @InjectRepository(LineaExtension)
    private readonly lineaExtensionRepository: Repository<LineaExtension>,
  ) {}

  /**
   * Crea una nueva herramienta
   * @param createHerramientaDto - Datos para crear la herramienta
   * @returns La herramienta creada
   */
  async create(createHerramientaDto: CreateHerramientaDto) {
    try {
      const { lineasInvestigacionIds = [], lineasExtensionIds = [], ...herramientaData } = createHerramientaDto;
      
      const herramienta = this.herramientaRepository.create({
        ...herramientaData,
        lineasInvestigacion: [],
        lineasExtension: [],
      });

      // Asignar líneas de investigación si se proporcionan
      if (lineasInvestigacionIds && lineasInvestigacionIds.length > 0) {
        const lineasInvestigacion = await this.lineaInvestigacionRepository.findByIds(lineasInvestigacionIds);
        herramienta.lineasInvestigacion = lineasInvestigacion;
      }

      // Asignar líneas de extensión si se proporcionan
      if (lineasExtensionIds && lineasExtensionIds.length > 0) {
        const lineasExtension = await this.lineaExtensionRepository.findByIds(lineasExtensionIds);
        herramienta.lineasExtension = lineasExtension;
      }

      await this.herramientaRepository.save(herramienta);
      return herramienta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todas las herramientas
   * @returns Lista de herramientas
   */
  async findAll() {
    return await this.herramientaRepository.find({
      relations: ['lineasInvestigacion', 'lineasExtension'],
    });
  }

  /**
   * Busca una herramienta por su ID
   * @param id - ID de la herramienta a buscar
   * @returns La herramienta encontrada
   */
  async findOne(id: string) {
    const herramienta = await this.herramientaRepository.findOne({
      where: { id },
      relations: ['lineasInvestigacion', 'lineasExtension'],
    });

    if (!herramienta) {
      throw new NotFoundException(`Herramienta con ID "${id}" no encontrada`);
    }

    return herramienta;
  }

  /**
   * Actualiza una herramienta existente
   * @param id - ID de la herramienta a actualizar
   * @param updateHerramientaDto - Datos para actualizar la herramienta
   * @returns La herramienta actualizada
   */
  async update(id: string, updateHerramientaDto: UpdateHerramientaDto) {
    const { lineasInvestigacionIds, lineasExtensionIds, ...toUpdate } = updateHerramientaDto;
    
    const herramienta = await this.herramientaRepository.preload({
      id,
      ...toUpdate,
    });

    if (!herramienta) {
      throw new NotFoundException(`Herramienta con ID "${id}" no encontrada`);
    }

    try {
      // Actualizar relación con líneas de investigación si se proporcionan
      if (lineasInvestigacionIds) {
        const lineasInvestigacion = await this.lineaInvestigacionRepository.findByIds(lineasInvestigacionIds);
        herramienta.lineasInvestigacion = lineasInvestigacion;
      }

      // Actualizar relación con líneas de extensión si se proporcionan
      if (lineasExtensionIds) {
        const lineasExtension = await this.lineaExtensionRepository.findByIds(lineasExtensionIds);
        herramienta.lineasExtension = lineasExtension;
      }

      await this.herramientaRepository.save(herramienta);
      return herramienta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina una herramienta por su ID (soft delete)
   * @param id - ID de la herramienta a eliminar
   * @returns La herramienta eliminada
   */
  async remove(id: string) {
    const herramienta = await this.findOne(id);
    await this.herramientaRepository.softRemove(herramienta);
    return herramienta;
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
