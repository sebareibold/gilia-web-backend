import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity('personas')
export class Persona {
    @PrimaryColumn()
     dni: number;

     @Column({ length: 100 })
     nombre: string;
     
     @Column({ length: 100 })
     apellido: string;
     
     @Column({ unique: true })
     correo: string;
     
     @Column({ default: true })
     activo: boolean;
     
     @Column()
     telefono: string;

     @Column()
     linkLinkedin: string;

     @Column()
     linkGitHub: string;
     
     @ManyToMany(() => Publicacion, publicacion => publicacion.autores)
     @JoinTable()
     publicaciones: Publicacion[];

     @ManyToMany(() => Proyecto, proyecto => proyecto.autores)
     @JoinTable()
     proyectos: Proyecto[];
}


/* 
Esta entidad se relaciona con publicaciones y proyectos
*/