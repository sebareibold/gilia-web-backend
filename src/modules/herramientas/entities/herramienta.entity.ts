import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { LineaInvestigacion } from '../../linea-investigacion/entities/linea-investigacion.entity';
import { LineaExtension } from '../../linea-extension/entities/linea-extension.entity';

@Entity('herramientas')
export class Herramienta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  enlace: string;

  // Relación con LineaInvestigacion (M:N)
  @ManyToMany(() => LineaInvestigacion, linea => linea.herramientas)
  lineasInvestigacion: LineaInvestigacion[];

  // Relación con LineaExtension (M:N)
  @ManyToMany(() => LineaExtension, linea => linea.herramientas)
  lineasExtension: LineaExtension[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
