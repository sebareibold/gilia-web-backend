import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { LineaExtension } from '../../lineas-extension/entities/linea-extension.entity';
import { LineaInvestigacion } from '../../lineas-investigacion/entities/linea-investigacion.entity';

@Entity('novedades')
export class Novedad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  descripcion: string;

  @Column('date')
  fecha: Date;

  @Column('text', { nullable: true })
  link: string;

  // Relación con LineaExtension (M:1)
  @ManyToOne(() => LineaExtension, lineaExtension => lineaExtension.novedades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'linea_extension_id' })
  lineaExtension: LineaExtension;

  // Relación con LineaInvestigacion (M:1)
  @ManyToOne(() => LineaInvestigacion, lineaInvestigacion => lineaInvestigacion.novedades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'linea_investigacion_id' })
  lineaInvestigacion: LineaInvestigacion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
