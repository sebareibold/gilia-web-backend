import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaExtension } from './entities/linea-extension.entity';
import { CreateLineaExtensionDto } from './dto/create-linea-extension.dto';
import { UpdateLineaExtensionDto } from './dto/update-linea-extension.dto';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Herramienta } from '../herramientas/entities/herramienta.entity';
import { Novedad } from '../novedades/entities/novedad.entity';

@Injectable()
export class LineaExtensionService {
  private readonly logger = new Logger('LineaExtensionService');

  constructor(
    @InjectRepository(LineaExtension)
    private readonly lineaExtensionRepository: Repository<LineaExtension>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
    @InjectRepository(Novedad)
    private readonly novedadRepository: Repository<Novedad>,
  ) {}

  /**
   * Crea una nueva línea de extensión
   * @param createLineaExtensionDto - Datos para crear la línea de extensión
   * @returns La línea de extensión creada
   */
  async create(createLineaExtensionDto: CreateLineaExtensionDto) {
    try {
      const { proyectosIds = [], herramientasIds = [], ...lineaData } = createLineaExtensionDto;
      
      const linea = this.lineaExtensionRepository.create({
        ...lineaData,
        proyectos: [],
        herramientas: [],
        novedades: [],
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

      // No se asocian novedades al crear la línea de extensión
      // Las novedades se asocian cuando se crean o actualizan

      await this.lineaExtensionRepository.save(linea);
      return linea;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todas las líneas de extensión
   * @returns Lista de líneas de extensión
   */
  async findAll() {
    return await this.lineaExtensionRepository.find({
      relations: ['proyectos', 'herramientas', 'novedad'],
    });
  }

  /**
   * Busca una línea de extensión por su ID
   * @param id - ID de la línea de extensión a buscar
   * @returns La línea de extensión encontrada
   */
  async findOne(id: string) {
    const linea = await this.lineaExtensionRepository.findOne({
      where: { id },
      relations: ['proyectos', 'herramientas', 'novedad'],
    });

    if (!linea) {
      throw new NotFoundException(`Línea de extensión con ID "${id}" no encontrada`);
    }

    return linea;
  }

  /**
   * Actualiza una línea de extensión existente
   * @param id - ID de la línea de extensión a actualizar
   * @param updateLineaExtensionDto - Datos para actualizar la línea de extensión
   * @returns La línea de extensión actualizada
   */
  async update(id: string, updateLineaExtensionDto: UpdateLineaExtensionDto) {
    const { proyectosIds, herramientasIds, ...toUpdate } = updateLineaExtensionDto;
    
    const linea = await this.lineaExtensionRepository.preload({
      id,
      ...toUpdate,
    });

    if (!linea) {
      throw new NotFoundException(`Línea de extensión con ID "${id}" no encontrada`);
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

      // No se actualiza la relación con novedades directamente
      // Las novedades se actualizan a través de su propio controlador/servicio

      await this.lineaExtensionRepository.save(linea);
      return linea;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina una línea de extensión por su ID (soft delete)
   * @param id - ID de la línea de extensión a eliminar
   * @returns La línea de extensión eliminada
   */
  async remove(id: string) {
    const linea = await this.findOne(id);
    await this.lineaExtensionRepository.softRemove(linea);
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
