import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity';
import { LineaInvestigacion } from '../../linea-investigacion/entities/linea-investigacion.entity';

export enum EstadoProyecto {
  EN_CURSO = 'en_curso',
  FINALIZADO = 'finalizado',
  SUSPENDIDO = 'suspendido',
  PLANIFICACION = 'planificacion'
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin', nullable: true })
  fechaFin: Date;

  @Column({
    type: 'enum',
    enum: EstadoProyecto,
    default: EstadoProyecto.PLANIFICACION
  })
  estado: EstadoProyecto;

  @ManyToMany(() => Persona, persona => persona.proyectos)
  @JoinTable({
    name: 'proyectos_personas',
    joinColumn: { name: 'proyecto_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'persona_dni', referencedColumnName: 'dni' }
  })
  autores: Persona[];

  // Relación con LineaInvestigación (M:M)
  @ManyToMany(() => LineaInvestigacion, linea => linea.proyectos)
  @JoinTable({
    name: 'proyectos_lineas_investigacion',
    joinColumn: { name: 'proyecto_id' },
    inverseJoinColumn: { name: 'linea_investigacion_id' }
  })
  lineasInvestigacion: LineaInvestigacion[];

  // Relación con LineaExtension (M:N)
  @ManyToMany(() => LineaExtension, linea => linea.proyectos)
  lineasExtension: LineaExtension[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
