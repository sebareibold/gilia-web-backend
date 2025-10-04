import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Persona } from '../personas/entities/persona.entity';

@Injectable()
export class ProyectosService {
  private readonly logger = new Logger('ProyectosService');

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  /**
   * Crea un nuevo proyecto en la base de datos
   * @param createProyectoDto - Datos para crear el proyecto
   * @returns El proyecto creado
   */
  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const { autoresIds = [], ...proyectoData } = createProyectoDto;
      
      const proyecto = this.proyectoRepository.create({
        ...proyectoData,
        autores: [],
      });

      // Asignar autores si se proporcionan
      if (autoresIds && autoresIds.length > 0) {
        const autores = await this.personaRepository.findByIds(autoresIds);
        if (autores.length !== autoresIds.length) {
          throw new BadRequestException('Uno o más IDs de autores no son válidos');
        }
        proyecto.autores = autores;
      }

      await this.proyectoRepository.save(proyecto);
      return proyecto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todos los proyectos
   * @returns Lista de proyectos
   */
  async findAll() {
    return await this.proyectoRepository.find({
      relations: ['autores'],
      withDeleted: false,
    });
  }

  /**
   * Busca un proyecto por su ID
   * @param id - ID del proyecto a buscar
   * @returns El proyecto encontrado
   */
  async findOne(id: string) {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['autores'],
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
    }

    return proyecto;
  }

  /**
   * Actualiza un proyecto existente
   * @param id - ID del proyecto a actualizar
   * @param updateProyectoDto - Datos para actualizar el proyecto
   * @returns El proyecto actualizado
   */
  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    const { autoresIds, ...toUpdate } = updateProyectoDto;
    const proyecto = await this.proyectoRepository.preload({
      id,
      ...toUpdate,
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado`);
    }

    try {
      // Actualizar la relación con autores si se proporcionan
      if (autoresIds) {
        const autores = await this.personaRepository.findByIds(autoresIds);
        if (autores.length !== autoresIds.length) {
          throw new BadRequestException('Uno o más IDs de autores no son válidos');
        }
        proyecto.autores = autores;
      }

      await this.proyectoRepository.save(proyecto);
      return proyecto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina un proyecto por su ID (soft delete)
   * @param id - ID del proyecto a eliminar
   * @returns El proyecto eliminado
   */
  async remove(id: string) {
    const proyecto = await this.findOne(id);
    await this.proyectoRepository.softRemove(proyecto);
    return proyecto;
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
