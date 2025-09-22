import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  // Metodo Create
  async create(persona: Persona): Promise<Persona> {
    const {
      dni,
      nombre,
      apellido,
      correo,
      telefono,
      linkLinkedin,
      linkGitHub,
      publicaciones,
      proyectos,
    } = persona;

    // Verificar que no exista una persona con el mismo DNI
    const existingPersona = await this.personaRepo.findOne({ where: { dni } });
    if (existingPersona) {
      throw new BadRequestException('Persona ya registrada'); // Cambiado a BadRequest
    }

    // Crear la entidad
    const newPersona = this.personaRepo.create({
      dni,
      nombre,
      apellido,
      correo,
      telefono,
      linkLinkedin,
      linkGitHub,
      publicaciones,
      proyectos,
      activo: true, // asegurar que por defecto está activo
    });

    return this.personaRepo.save(newPersona);
  }

  // Metodo findAll
  async findAll(): Promise<Persona[]> {
    return this.personaRepo.find();
  }

  // Metodo Find one
  async findOne(dni: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({
      where: { dni },
      relations: ['publicaciones', 'proyectos'],
    });
    if (!persona) {
      throw new NotFoundException(`No se encontró persona con DNI ${dni}`);
    }
    return persona;
  }

  // Metodo Update
  async update(dni: number, persona: Persona): Promise<Persona> {
    const existingPersona = await this.personaRepo.findOne({
      where: { dni },
      relations: ['publicaciones', 'proyectos'],
    });
    if (!existingPersona) {
      throw new NotFoundException(`No se encontró persona con DNI ${dni}`);
    }

    // Actualizar solo campos enviados
    existingPersona.nombre = persona.nombre ?? existingPersona.nombre;
    existingPersona.apellido = persona.apellido ?? existingPersona.apellido;
    existingPersona.correo = persona.correo ?? existingPersona.correo;
    existingPersona.telefono = persona.telefono ?? existingPersona.telefono;
    existingPersona.linkLinkedin = persona.linkLinkedin ?? existingPersona.linkLinkedin;
    existingPersona.linkGitHub = persona.linkGitHub ?? existingPersona.linkGitHub;

    // Actualizar relaciones M:N si vienen (mapear IDs a entidades antes)
    if (persona.publicaciones) {
      existingPersona.publicaciones = persona.publicaciones;
    }
    if (persona.proyectos) {
      existingPersona.proyectos = persona.proyectos;
    }

    return this.personaRepo.save(existingPersona);
  }

  // Metodo para eliminar a la persona
  async remove(dni: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni } });
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);
  
    await this.personaRepo.remove(persona);
    return persona;
  }

  // Metodo desactivar
  async deactivate(dni: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni } });
    
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);
    persona.activo = false;

    return this.personaRepo.save(persona);
  }

  // Metodo Activar 
  async activate(dni: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni } });
    
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);
    persona.activo = true;
    
    return this.personaRepo.save(persona);
  }


  // Agregar proyectos
  async addProyectos(dni: number, proyectoIds: number[]): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni }, relations: ['proyectos'] });
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);

    //  Por ahora da error pq no implemente lo de proyecto, lo mismo con publicacioens
    const proyectos = await this.proyectoRepo.find({ where: { id: In(proyectoIds) } });

    // Evitar duplicados
    persona.proyectos = [...persona.proyectos, ...proyectos.filter(p => !persona.proyectos.some(ep => ep.id === p.id))];

    return this.personaRepo.save(persona);
  }

  // Quitar proyectos
  async removeProyectos(dni: number, proyectoIds: number[]): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni }, relations: ['proyectos'] });
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);

    persona.proyectos = persona.proyectos.filter(p => !proyectoIds.includes(p.id));
    return this.personaRepo.save(persona);
  }

  // Agregar publicaciones
  async addPublicaciones(dni: number, publicacionIds: number[]): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni }, relations: ['publicaciones'] });
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);

    const publicaciones = await this.publicacionRepo.find({ where: { id: In(publicacionIds) } });
    persona.publicaciones = [...persona.publicaciones, ...publicaciones.filter(pub => !persona.publicaciones.some(ep => ep.id === pub.id))];

    return this.personaRepo.save(persona);
  }

  // Quitar publicaciones
  async removePublicaciones(dni: number, publicacionIds: number[]): Promise<Persona> {
    const persona = await this.personaRepo.findOne({ where: { dni }, relations: ['publicaciones'] });
    if (!persona) throw new NotFoundException(`No se encontró persona con DNI ${dni}`);

    persona.publicaciones = persona.publicaciones.filter(pub => !publicacionIds.includes(pub.id));
    return this.personaRepo.save(persona);
  }
}

}
