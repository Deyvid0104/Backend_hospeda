import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Entity()
export class DetalleReserva {
  // Identificador único del detalle de reserva
  @PrimaryGeneratedColumn()
  id_detalle: number;

  // Relación ManyToOne con la entidad Reserva
  @ManyToOne(() => Reserva, reserva => reserva.detalles_reserva)
  @JoinColumn({ name: 'id_reserva' })
  reserva: Reserva;

  // Relación ManyToOne con la entidad Habitacion
  @ManyToOne(() => Habitacion, habitacion => habitacion.detalles_reserva)
  @JoinColumn({ name: 'id_habitacion' })
  habitacion: Habitacion;

  // Número de noches reservadas
  @Column()
  noches: number;

  // Precio aplicado para la reserva
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_aplicado: number;
}
