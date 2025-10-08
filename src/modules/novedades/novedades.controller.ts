import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { CreateNovedadDto } from './dto/create-novedad.dto';
import { UpdateNovedadDto } from './dto/update-novedad.dto';
import { Novedad } from './entities/novedad.entity';

@Controller('novedades')
export class NovedadesController {
  constructor(private readonly novedadesService: NovedadesService) {}

  /**
   * Crea una nueva novedad
   * @param createNovedadDto - Datos para crear la novedad
   * @returns La novedad creada
   */
  @Post()
  create(@Body() createNovedadDto: CreateNovedadDto): Promise<Novedad> {
    return this.novedadesService.create(createNovedadDto);
  }

  /**
   * Obtiene todas las novedades
   * @param lineaExtensionId - Filtro opcional por ID de línea de extensión
   * @returns Lista de novedades
   */
  @Get()
  findAll(@Query('lineaExtensionId') lineaExtensionId?: string): Promise<Novedad[]> {
    return this.novedadesService.findAll();
  }

  /**
   * Obtiene una novedad por su ID
   * @param id - ID de la novedad
   * @returns La novedad encontrada
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Novedad> {
    return this.novedadesService.findOne(id);
  }

  /**
   * Actualiza una novedad existente
   * @param id - ID de la novedad a actualizar
   * @param updateNovedadDto - Datos a actualizar
   * @returns La novedad actualizada
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNovedadDto: UpdateNovedadDto,
  ): Promise<Novedad> {
    return this.novedadesService.update(id, updateNovedadDto);
  }

  /**
   * Elimina una novedad
   * @param id - ID de la novedad a eliminar
   * @returns La novedad eliminada
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Novedad> {
    return this.novedadesService.remove(id);
  }
}
