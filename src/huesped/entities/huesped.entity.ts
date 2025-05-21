import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { ContactoEmergencia } from 'src/contacto_emergencia/entities/contacto_emergencia.entity';

// Entidad que representa la tabla Huésped en la base de datos
@Entity()
export class Huesped {
 // Identificador único del huésped (clave primaria)
 @PrimaryGeneratedColumn()
 id_huesped: number;

 // Nombre del huésped
 @Column()
 nombre: string;

 // Apellidos del huésped
 @Column()
 apellidos: string;

 // Documento de identidad único del huésped
 @Column({ unique: true })
 documento_identidad: string;

 // Teléfono de contacto del huésped
 @Column()
 telefono: string;

 // Correo electrónico único del huésped
 @Column({ unique: true })
 email: string;

 // Fecha de registro del huésped
 @Column()
 fecha_registro: Date;

 // Relación uno a muchos con la entidad Reserva (un huésped puede tener varias reservas)
 @OneToMany(() => Reserva, reserva => reserva.huesped)
 reservas: Reserva[];

 // Relación uno a muchos con la entidad ContactoEmergencia (un huésped puede tener varios contactos de emergencia)
 @OneToMany(() => ContactoEmergencia, contacto => contacto.huesped)
 contactos_emergencia: ContactoEmergencia[];
}
