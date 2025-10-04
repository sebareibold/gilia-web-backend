import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity';

@Entity()
export class Publicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column('date')
  fecha: Date;

  @Column('text')
  medio_de_publicacion: string;

  @Column('text')
  link: string;

  @ManyToMany(() => Persona, (persona) => persona.publicaciones, { nullable: true })
  @JoinTable()
  autores: Persona[];

  // Relación con LineaInvestigación (1:M)
  // @ManyToOne(() => LineaInvestigacion, (linea) => linea.publicaciones, { nullable: true })
  // lineaInvestigacion: LineaInvestigacion;

  // Relación con LineaExtension (1:M)
  // @ManyToOne(() => LineaExtension, (linea) => linea.publicaciones, { nullable: true })
  // lineaExtension: LineaExtension;
}
