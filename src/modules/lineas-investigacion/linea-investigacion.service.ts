import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaInvestigacion } from './entities/linea-investigacion.entity';
import { CreateLineaInvestigacionDto } from './dto/create-linea-investigacion.dto';
import { UpdateLineaInvestigacionDto } from './dto/update-linea-investigacion.dto';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Herramienta } from '../../herramientas/entities/herramienta.entity';

@Injectable()
export class LineaInvestigacionService {
  private readonly logger = new Logger('LineaInvestigacionService');

  constructor(
    @InjectRepository(LineaInvestigacion)
    private readonly lineaInvestigacionRepository: Repository<LineaInvestigacion>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
  ) {}

  /**
   * Crea una nueva línea de investigación
   * @param createLineaInvestigacionDto - Datos para crear la línea de investigación
   * @returns La línea de investigación creada
   */
  async create(createLineaInvestigacionDto: CreateLineaInvestigacionDto) {
    try {
      const { proyectosIds = [], herramientasIds = [], ...lineaData } = createLineaInvestigacionDto;
      
      const linea = this.lineaInvestigacionRepository.create({
        ...lineaData,
        proyectos: [],
        herramientas: [],
      });

      // Asignar proyectos si se proporcionan
      if (proyectosIds && proyectosIds.length > 0) {
        const proyectos = await this.proyectoRepository.findByIds(proyectosIds);
        linea.proyectos = proyectos;
      }

      // Asignar herramientas si se proporcionan
      if (herramientasIds && herramientasIds.length > 0) {
        const herramientas = await this.herramientaRepository.findByIds(herramientasIds);
        linea.herramientas = herramientas;
      }

      await this.lineaInvestigacionRepository.save(linea);
      return linea;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todas las líneas de investigación
   * @returns Lista de líneas de investigación
   */
  async findAll() {
    return await this.lineaInvestigacionRepository.find({
      relations: ['proyectos', 'herramientas'],
    });
  }

  /**
   * Busca una línea de investigación por su ID
   * @param id - ID de la línea de investigación a buscar
   * @returns La línea de investigación encontrada
   */
  async findOne(id: string) {
    const linea = await this.lineaInvestigacionRepository.findOne({
      where: { id },
      relations: ['proyectos', 'herramientas'],
    });

    if (!linea) {
      throw new NotFoundException(`Línea de investigación con ID "${id}" no encontrada`);
    }

    return linea;
  }

  /**
   * Actualiza una línea de investigación existente
   * @param id - ID de la línea de investigación a actualizar
   * @param updateLineaInvestigacionDto - Datos para actualizar la línea de investigación
   * @returns La línea de investigación actualizada
   */
  async update(id: string, updateLineaInvestigacionDto: UpdateLineaInvestigacionDto) {
    const { proyectosIds, herramientasIds, ...toUpdate } = updateLineaInvestigacionDto;
    
    const linea = await this.lineaInvestigacionRepository.preload({
      id,
      ...toUpdate,
    });

    if (!linea) {
      throw new NotFoundException(`Línea de investigación con ID "${id}" no encontrada`);
    }

    try {
      // Actualizar relación con proyectos si se proporcionan
      if (proyectosIds) {
        const proyectos = await this.proyectoRepository.findByIds(proyectosIds);
        linea.proyectos = proyectos;
      }

      // Actualizar relación con herramientas si se proporcionan
      if (herramientasIds) {
        const herramientas = await this.herramientaRepository.findByIds(herramientasIds);
        linea.herramientas = herramientas;
      }

      await this.lineaInvestigacionRepository.save(linea);
      return linea;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina una línea de investigación por su ID (soft delete)
   * @param id - ID de la línea de investigación a eliminar
   * @returns La línea de investigación eliminada
   */
  async remove(id: string) {
    const linea = await this.findOne(id);
    await this.lineaInvestigacionRepository.softRemove(linea);
    return linea;
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
