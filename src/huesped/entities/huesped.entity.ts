import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { ContactoEmergencia } from 'src/contacto_emergencia/entities/contacto_emergencia.entity';

@Entity()
export class Huesped {
 // Identificador único del huésped
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

 // Relación OneToMany con la entidad Reserva
 @OneToMany(() => Reserva, reserva => reserva.huesped)
 reservas: Reserva[];

 // Relación OneToMany con la entidad ContactoEmergencia
 @OneToMany(() => ContactoEmergencia, contacto => contacto.huesped)
 contactos_emergencia: ContactoEmergencia[];
}
