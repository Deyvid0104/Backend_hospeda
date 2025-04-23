import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Entity()
export class DetalleReserva {
 // Identificador único del detalle de reserva
 @PrimaryGeneratedColumn()
 id_detalle: number;

 // Identificador de la reserva asociada
 @Column()
 id_reserva: number;

 // Identificador de la habitación asociada
 @Column()
 id_habitacion: number;

 // Número de noches reservadas
 @Column()
 noches: number;

 // Precio aplicado para la reserva
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 precio_aplicado: number;

 // Relación ManyToOne con la entidad Reserva
 @ManyToOne(() => Reserva, reserva => reserva.detalles_reserva)
 reserva: Reserva;

 // Relación ManyToOne con la entidad Habitacion
 @ManyToOne(() => Habitacion, habitacion => habitacion.detalles_reserva)
 habitacion: Habitacion;
}
