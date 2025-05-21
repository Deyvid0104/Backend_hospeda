import { DetalleReserva } from 'src/detalle_reserva/entities/detalle_reserva.entity';
import { HistorialMantenimiento } from 'src/historial_mantenimiento/entities/historial_mantenimiento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';

// Entidad que representa la tabla Habitacion en la base de datos
@Entity()
export class Habitacion {
 // Identificador único de la habitación (clave primaria)
 @PrimaryGeneratedColumn()
 id_habitacion: number;

 // Número único asignado a la habitación
 @Index({ unique: true })
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

 // Precio base de la habitación con precisión decimal
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 precio_base: number;

 // Capacidad máxima de personas que puede alojar la habitación
 @Column()
 capacidad: number;

 // Foto de la habitación (puede ser URL o base64), campo opcional
 @Column({ type: 'varchar', nullable: true })
 foto?: string;

 // Relación uno a muchos con detalles de reserva asociados a esta habitación
 @OneToMany(() => DetalleReserva, detalle => detalle.habitacion)
 detalles_reserva: DetalleReserva[];

 // Relación uno a muchos con historial de mantenimiento de la habitación
 @OneToMany(() => HistorialMantenimiento, mantenimiento => mantenimiento.habitacion)
 historial_mantenimiento: HistorialMantenimiento[];
}
