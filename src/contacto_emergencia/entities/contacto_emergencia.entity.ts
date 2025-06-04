import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Huesped } from 'src/huesped/entities/huesped.entity';

// Entidad que representa la tabla ContactoEmergencia en la base de datos
@Entity()
export class ContactoEmergencia {
 // Identificador único del contacto de emergencia (clave primaria)
 @PrimaryGeneratedColumn()
 id_contacto: number;

 // Nombre completo del contacto de emergencia
 @Column()
 nombre: string;

 // Número de teléfono del contacto
 @Column()
 telefono: string;

 // Parentesco con el huésped
 @Column()
 parentesco: string;

 // Relación muchos a uno con la entidad Huesped (varios contactos pueden pertenecer a un huésped)
 @ManyToOne(() => Huesped, huesped => huesped.contactos_emergencia)
 @JoinColumn({ name: 'id_huesped' })
 huesped: Huesped;
}
