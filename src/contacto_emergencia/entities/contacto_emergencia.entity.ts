import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Huesped } from 'src/huesped/entities/huesped.entity';

// Entidad que representa la tabla ContactoEmergencia en la base de datos
@Entity()
export class ContactoEmergencia {
 // Identificador único del contacto de emergencia (clave primaria)
 @PrimaryGeneratedColumn()
 id_contacto: number;

 // Identificador del huésped asociado
 @Column()
 id_huesped: number;

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
 huesped: Huesped;
}
