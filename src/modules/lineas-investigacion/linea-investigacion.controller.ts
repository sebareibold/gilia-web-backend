import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LineaInvestigacionService } from './linea-investigacion.service';
import { CreateLineaInvestigacionDto } from './dto/create-linea-investigacion.dto';
import { UpdateLineaInvestigacionDto } from './dto/update-linea-investigacion.dto';
import { LineaInvestigacion } from './entities/linea-investigacion.entity';

@Controller('lineas-investigacion')
export class LineaInvestigacionController {
  constructor(private readonly lineaInvestigacionService: LineaInvestigacionService) {}

  /**
   * Crea una nueva línea de investigación
   * @param createLineaInvestigacionDto - Datos para crear la línea de investigación
   * @returns La línea de investigación creada
   */
  @Post()
  create(@Body() createLineaInvestigacionDto: CreateLineaInvestigacionDto): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionService.create(createLineaInvestigacionDto);
  }

  /**
   * Obtiene todas las líneas de investigación
   * @returns Lista de líneas de investigación
   */
  @Get()
  findAll(): Promise<LineaInvestigacion[]> {
    return this.lineaInvestigacionService.findAll();
  }

  /**
   * Obtiene una línea de investigación por su ID
   * @param id - ID de la línea de investigación
   * @returns La línea de investigación encontrada
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionService.findOne(id);
  }

  /**
   * Actualiza una línea de investigación existente
   * @param id - ID de la línea de investigación a actualizar
   * @param updateLineaInvestigacionDto - Datos a actualizar
   * @returns La línea de investigación actualizada
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLineaInvestigacionDto: UpdateLineaInvestigacionDto,
  ): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionService.update(id, updateLineaInvestigacionDto);
  }

  /**
   * Elimina una línea de investigación (soft delete)
   * @param id - ID de la línea de investigación a eliminar
   * @returns La línea de investigación eliminada
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionService.remove(id);
  }
}
