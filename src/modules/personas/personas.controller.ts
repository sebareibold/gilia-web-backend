import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  // Crear persona
  @Post()
  create(@Body() createDto: CreatePersonaDto) {
    return this.personasService.create(createDto); // service recibe DTO o mapea a Persona
  }

  // Listar todas las personas
  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  // Buscar persona por DNI
  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.personasService.findOne(+dni);
  }

  // Actualizar persona por DNI
  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() updateDto: UpdatePersonaDto) {
    return this.personasService.update(+dni, updateDto);
  }

  // Eliminar persona por DNI
  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.personasService.remove(+dni);
  }


  // Desactivar persona (soft delete)
  @Patch(':dni/deactivate')
  deactivate(@Param('dni') dni: string) {
    return this.personasService.deactivate(+dni);
  }

  // Activar persona
  @Patch(':dni/activate')
  activate(@Param('dni') dni: string) {
    return this.personasService.activate(+dni);
  }


// ===== Proyectos y Publicaciones =====

// Vincular proyectos
@Patch(':dni/proyectos/add')
addProyectos(@Param('dni') dni: string, @Body() proyectos: number[]) {
  return this.personasService.addProyectos(+dni, proyectos);
}

// Desvincular proyectos
@Patch(':dni/proyectos/remove')
removeProyectos(@Param('dni') dni: string, @Body() proyectos: number[]) {
  return this.personasService.removeProyectos(+dni, proyectos);
}

// Vincular publicaciones
@Patch(':dni/publicaciones/add')
addPublicaciones(@Param('dni') dni: string, @Body() publicaciones: number[]) {
  return this.personasService.addPublicaciones(+dni, publicaciones);
}

// Desvincular publicaciones
@Patch(':dni/publicaciones/remove')
removePublicaciones(@Param('dni') dni: string, @Body() publicaciones: number[]) {
  return this.personasService.removePublicaciones(+dni, publicaciones);
}

}


// El + delante de dni es un atajo de JavaScript/TypeScript para convertir un string a número.


// ======= Siguientess Tareas =======
// Crear entidad Proyecto con su relación M:N a Persona.
// Crear entidad Publicacion con su relación M:N a Persona.
// Inyectar sus repositorios en el service (@InjectRepository(Proyecto) y @InjectRepository(Publicacion)).
// Implementar métodos addProyectos y addPublicaciones correctamente usando esos repositorios.