import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Herramienta } from '../../herramientas/entities/herramienta.entity';
import { Novedad } from '../../novedades/entities/novedad.entity';

export enum EstadoLineaInvestigacion {
  ACTIVA = 'activa',
  INACTIVA = 'inactiva',
  EN_DESARROLLO = 'en_desarrollo'
}

@Entity('lineas_investigacion')
export class LineaInvestigacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column('text', { array: true, default: [] })
  imagenes: string[];

  @Column({
    type: 'enum',
    enum: EstadoLineaInvestigacion,
    default: EstadoLineaInvestigacion.EN_DESARROLLO
  })
  estado: EstadoLineaInvestigacion;

  // Relación con Proyectos (M:N)
  @ManyToMany(() => Proyecto, proyecto => proyecto.lineasInvestigacion)
  @JoinTable({
    name: 'lineas_investigacion_proyectos',
    joinColumn: { name: 'linea_investigacion_id' },
    inverseJoinColumn: { name: 'proyecto_id' }
  })
  proyectos: Proyecto[];

  // Relación con Publicaciones (1:M)
  @OneToMany(() => Publicacion, publicacion => publicacion.lineaInvestigacion)
  publicaciones: Publicacion[];

  // Relación con Herramientas (M:N)
  @ManyToMany(() => Herramienta, herramienta => herramienta.lineasInvestigacion)
  @JoinTable({
    name: 'lineas_investigacion_herramientas',
    joinColumn: { name: 'linea_investigacion_id' },
    inverseJoinColumn: { name: 'herramienta_id' }
  })
  herramientas: Herramienta[];

  // Relación con Novedades (1:M)
  @OneToMany(() => Novedad, novedad => novedad.lineaInvestigacion)
  novedades: Novedad[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
