import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Huesped } from 'src/huesped/entities/huesped.entity';
import { DetalleReserva } from 'src/detalle_reserva/entities/detalle_reserva.entity';
import { Factura } from 'src/factura/entities/factura.entity';

@Entity()
export class Reserva {
 // Identificador único de la reserva
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

 // Identificador del huésped asociado
 @Column()
 id_huesped: number;

 // Relación ManyToOne con la entidad Huesped
 @ManyToOne(() => Huesped, huesped => huesped.reservas)
 huesped: Huesped;

 // Relación OneToMany con la entidad DetalleReserva
 @OneToMany(() => DetalleReserva, detalle => detalle.reserva)
 detalles_reserva: DetalleReserva[];

 // Relación OneToOne con la entidad Factura
 @OneToOne(() => Factura, factura => factura.reserva)
 factura: Factura;
}
