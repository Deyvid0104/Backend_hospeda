import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Huesped } from 'src/huesped/entities/huesped.entity';
import { DetalleReserva } from 'src/detalle_reserva/entities/detalle_reserva.entity';
import { Factura } from 'src/factura/entities/factura.entity';

// Entidad que representa la tabla Reserva en la base de datos
@Entity()
export class Reserva {
 // Identificador único de la reserva (clave primaria)
 @PrimaryGeneratedColumn()
 id_reserva: number;

 // Fecha de entrada de la reserva
 @Column()
 fecha_entrada: Date;

 // Fecha de salida de la reserva
 @Column()
 fecha_salida: Date;

 // Estado de la reserva: confirmada o cancelada
 @Column({
     type: 'enum',
     enum: ['confirmada', 'cancelada'],
 })
 estado: 'confirmada' | 'cancelada';

 // Identificador del huésped asociado a la reserva
 @Column()
 id_huesped: number;

 // Relación ManyToOne con la entidad Huesped (muchas reservas pueden pertenecer a un huésped)
 @ManyToOne(() => Huesped, huesped => huesped.reservas)
 huesped: Huesped;

 // Relación OneToMany con la entidad DetalleReserva (una reserva puede tener varios detalles)
 @OneToMany(() => DetalleReserva, detalle => detalle.reserva)
 detalles_reserva: DetalleReserva[];

 // Relación OneToOne con la entidad Factura (una reserva tiene una factura asociada)
 @OneToOne(() => Factura, factura => factura.reserva)
 factura: Factura;
}
