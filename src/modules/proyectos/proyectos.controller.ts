import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { EstadoProyecto } from './entities/proyecto.entity';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  /**
   * Crea un nuevo proyecto
   * @param createProyectoDto - Datos del proyecto a crear
   * @returns El proyecto creado
   */
  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    return this.proyectosService.create(createProyectoDto);
  }

  /**
   * Obtiene todos los proyectos
   * @param estado - Filtro opcional por estado del proyecto
   * @returns Lista de proyectos
   */
  @Get()
  findAll(@Query('estado') estado?: EstadoProyecto): Promise<Proyecto[]> {
    return this.proyectosService.findAll();
  }

  /**
   * Obtiene un proyecto por su ID
   * @param id - ID del proyecto
   * @returns El proyecto encontrado
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Proyecto> {
    return this.proyectosService.findOne(id);
  }

  /**
   * Actualiza un proyecto existente
   * @param id - ID del proyecto a actualizar
   * @param updateProyectoDto - Datos a actualizar
   * @returns El proyecto actualizado
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ): Promise<Proyecto> {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  /**
   * Elimina un proyecto (soft delete)
   * @param id - ID del proyecto a eliminar
   * @returns El proyecto eliminado
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Proyecto> {
    return this.proyectosService.remove(id);
  }
}
