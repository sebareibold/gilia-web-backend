import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LineaExtensionService } from './linea-extension.service';
import { CreateLineaExtensionDto } from './dto/create-linea-extension.dto';
import { UpdateLineaExtensionDto } from './dto/update-linea-extension.dto';
import { LineaExtension } from './entities/linea-extension.entity';

@Controller('lineas-extension')
export class LineaExtensionController {
  constructor(private readonly lineaExtensionService: LineaExtensionService) {}

  /**
   * Crea una nueva línea de extensión
   * @param createLineaExtensionDto - Datos de la línea de extensión a crear
   * @returns La línea de extensión creada
   */
  @Post()
  create(@Body() createLineaExtensionDto: CreateLineaExtensionDto): Promise<LineaExtension> {
    return this.lineaExtensionService.create(createLineaExtensionDto);
  }

  /**
   * Obtiene todas las líneas de extensión
   * @returns Lista de líneas de extensión
   */
  @Get()
  findAll(): Promise<LineaExtension[]> {
    return this.lineaExtensionService.findAll();
  }

  /**
   * Obtiene una línea de extensión por su ID
   * @param id - ID de la línea de extensión
   * @returns La línea de extensión encontrada
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<LineaExtension> {
    return this.lineaExtensionService.findOne(id);
  }

  /**
   * Actualiza una línea de extensión existente
   * @param id - ID de la línea de extensión a actualizar
   * @param updateLineaExtensionDto - Datos a actualizar
   * @returns La línea de extensión actualizada
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLineaExtensionDto: UpdateLineaExtensionDto,
  ): Promise<LineaExtension> {
    return this.lineaExtensionService.update(id, updateLineaExtensionDto);
  }

  /**
   * Elimina una línea de extensión (soft delete)
   * @param id - ID de la línea de extensión a eliminar
   * @returns La línea de extensión eliminada
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<LineaExtension> {
    return this.lineaExtensionService.remove(id);
  }
}
