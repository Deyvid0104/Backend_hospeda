import { DetalleReserva } from 'src/detalle_reserva/entities/detalle_reserva.entity';
import { HistorialMantenimiento } from 'src/historial_mantenimiento/entities/historial_mantenimiento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Habitacion {
 // Identificador único de la habitación
 @PrimaryGeneratedColumn()
 id_habitacion: number;

 // Número asignado a la habitación
 @Column()
 numero: number;

 // Tipo de habitación: individual, doble, triple o dormitorio
 @Column({
     type: 'enum',
     enum: ['individual', 'doble', 'triple', 'dormitorio'],
 })
 tipo: 'individual' | 'doble' | 'triple' | 'dormitorio';

 // Estado actual de la habitación: libre, ocupada, limpieza o mantenimiento
 @Column({
     type: 'enum',
     enum: ['libre', 'ocupada', 'limpieza', 'mantenimiento'],
 })
 estado: 'libre' | 'ocupada' | 'limpieza' | 'mantenimiento';

 // Precio base de la habitación
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 precio_base: number;

 // Capacidad máxima de personas que puede alojar la habitación
 @Column()
 capacidad: number;

 // Reservas asociadas a esta habitación
 @OneToMany(() => DetalleReserva, detalle => detalle.habitacion)
 detalles_reserva: DetalleReserva[];

 // Historial de mantenimiento de la habitación
 @OneToMany(() => HistorialMantenimiento, mantenimiento => mantenimiento.habitacion)
 historial_mantenimiento: HistorialMantenimiento[];
}
