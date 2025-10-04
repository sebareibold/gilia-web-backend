import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Persona } from '../personas/entities/persona.entity';

@Injectable()
export class PublicacionesService {
  private readonly logger = new Logger('PublicacionesService');

  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  /**
   * Crea una nueva publicación en la base de datos
   * @param createPublicacionDto - Datos para crear la publicación
   * @returns La publicación creada
   */
  async create(createPublicacionDto: CreatePublicacionDto) {
    try {
      const { autoresIds = [], ...publicacionData } = createPublicacionDto;
      
      const publicacion = this.publicacionRepository.create({
        ...publicacionData,
        autores: [],
      });

      // Asignar autores si se proporcionan
      if (autoresIds && autoresIds.length > 0) {
        const autores = await this.personaRepository.findByIds(autoresIds);
        if (autores.length !== autoresIds.length) {
          throw new BadRequestException('Uno o más IDs de autores no son válidos');
        }
        publicacion.autores = autores;
      }

      await this.publicacionRepository.save(publicacion);
      return publicacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Obtiene todas las publicaciones
   * @returns Lista de publicaciones
   */
  async findAll() {
    return await this.publicacionRepository.find({
      relations: ['autores'],
    });
  }

  /**
   * Busca una publicación por su ID
   * @param id - ID de la publicación a buscar
   * @returns La publicación encontrada
   */
  async findOne(id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id },
      relations: ['autores'],
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicación con ID "${id}" no encontrada`);
    }

    return publicacion;
  }

  /**
   * Actualiza una publicación existente
   * @param id - ID de la publicación a actualizar
   * @param updatePublicacionDto - Datos para actualizar la publicación
   * @returns La publicación actualizada
   */
  async update(id: string, updatePublicacionDto: UpdatePublicacionDto) {
    const { autoresIds, ...toUpdate } = updatePublicacionDto;
    const publicacion = await this.publicacionRepository.preload({
      id,
      ...toUpdate,
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicación con ID "${id}" no encontrada`);
    }

    try {
      // Actualizar la relación con autores si se proporcionan
      if (autoresIds) {
        const autores = await this.personaRepository.findByIds(autoresIds);
        if (autores.length !== autoresIds.length) {
          throw new BadRequestException('Uno o más IDs de autores no son válidos');
        }
        publicacion.autores = autores;
      }

      await this.publicacionRepository.save(publicacion);
      return publicacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  /**
   * Elimina una publicación por su ID
   * @param id - ID de la publicación a eliminar
   * @returns La publicación eliminada
   */
  async remove(id: string) {
    const publicacion = await this.findOne(id);
    await this.publicacionRepository.remove(publicacion);
    return publicacion;
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
