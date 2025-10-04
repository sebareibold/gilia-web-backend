import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Publicacion } from './entities/publicacion.entity';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  /**
   * Crea una nueva publicación
   * @param createPublicacionDto - Datos de la publicación a crear
   * @returns La publicación creada
   */
  @Post()
  create(@Body() createPublicacionDto: CreatePublicacionDto): Promise<Publicacion> {
    return this.publicacionesService.create(createPublicacionDto);
  }

  /**
   * Obtiene todas las publicaciones
   * @returns Lista de todas las publicaciones
   */
  @Get()
  findAll(): Promise<Publicacion[]> {
    return this.publicacionesService.findAll();
  }

  /**
   * Obtiene una publicación por su ID
   * @param id - ID de la publicación
   * @returns La publicación encontrada
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Publicacion> {
    const publicacion = await this.publicacionesService.findOne(id);
    if (!publicacion) {
      throw new NotFoundException(`Publicación con ID "${id}" no encontrada`);
    }
    return publicacion;
  }

  /**
   * Actualiza una publicación existente
   * @param id - ID de la publicación a actualizar
   * @param updatePublicacionDto - Datos a actualizar
   * @returns La publicación actualizada
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePublicacionDto: UpdatePublicacionDto,
  ): Promise<Publicacion> {
    return this.publicacionesService.update(id, updatePublicacionDto);
  }

  /**
   * Elimina una publicación
   * @param id - ID de la publicación a eliminar
   * @returns La publicación eliminada
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Publicacion> {
    return this.publicacionesService.remove(id);
  }
}
