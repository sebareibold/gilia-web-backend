import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Novedad } from '../../novedades/entities/novedad.entity';
import { Herramienta } from '../../herramientas/entities/herramienta.entity';

export enum EstadoLineaExtension {
  ACTIVA = 'activa',
  INACTIVA = 'inactiva',
  EN_DESARROLLO = 'en_desarrollo'
}

@Entity('lineas_extension')
export class LineaExtension {
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
    enum: EstadoLineaExtension,
    default: EstadoLineaExtension.EN_DESARROLLO
  })
  estado: EstadoLineaExtension;

  // Relación con Proyectos (M:N)
  @ManyToMany(() => Proyecto, proyecto => proyecto.lineasExtension)
  @JoinTable({
    name: 'lineas_extension_proyectos',
    joinColumn: { name: 'linea_extension_id' },
    inverseJoinColumn: { name: 'proyecto_id' }
  })
  proyectos: Proyecto[];

  // Relación con Publicaciones (1:M)
  @OneToMany(() => Publicacion, publicacion => publicacion.lineaExtension)
  publicaciones: Publicacion[];

  // Relación con Herramientas (M:N)
  @ManyToMany(() => Herramienta, herramienta => herramienta.lineasExtension)
  @JoinTable({
    name: 'lineas_extension_herramientas',
    joinColumn: { name: 'linea_extension_id' },
    inverseJoinColumn: { name: 'herramienta_id' }
  })
  herramientas: Herramienta[];

  // Relación con Novedades (1:M)
  @OneToMany(() => Novedad, novedad => novedad.lineaExtension)
  novedades: Novedad[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
