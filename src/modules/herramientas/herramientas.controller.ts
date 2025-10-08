import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';
import { Herramienta } from './entities/herramienta.entity';

@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  /**
   * Crea una nueva herramienta
   * @param createHerramientaDto - Datos para crear la herramienta
   * @returns La herramienta creada
   */
  @Post()
  create(@Body() createHerramientaDto: CreateHerramientaDto): Promise<Herramienta> {
    return this.herramientasService.create(createHerramientaDto);
  }

  /**
   * Obtiene todas las herramientas
   * @returns Lista de herramientas
   */
  @Get()
  findAll(): Promise<Herramienta[]> {
    return this.herramientasService.findAll();
  }

  /**
   * Obtiene una herramienta por su ID
   * @param id - ID de la herramienta
   * @returns La herramienta encontrada
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Herramienta> {
    return this.herramientasService.findOne(id);
  }

  /**
   * Actualiza una herramienta existente
   * @param id - ID de la herramienta a actualizar
   * @param updateHerramientaDto - Datos a actualizar
   * @returns La herramienta actualizada
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHerramientaDto: UpdateHerramientaDto,
  ): Promise<Herramienta> {
    return this.herramientasService.update(id, updateHerramientaDto);
  }

  /**
   * Elimina una herramienta (soft delete)
   * @param id - ID de la herramienta a eliminar
   * @returns La herramienta eliminada
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Herramienta> {
    return this.herramientasService.remove(id);
  }
}
