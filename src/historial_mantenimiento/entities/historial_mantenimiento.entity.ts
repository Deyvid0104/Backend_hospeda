import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Entity()
export class HistorialMantenimiento {
 // Identificador único del historial de mantenimiento
 @PrimaryGeneratedColumn()
 id_mantenimiento: number;

 // Identificador de la habitación asociada
 @Column()
 id_habitacion: number;

 // Fecha de inicio del mantenimiento
 @Column()
 fecha_inicio: Date;

 // Fecha de fin del mantenimiento
 @Column()
 fecha_fin: Date;

 // Descripción detallada del mantenimiento
 @Column('text')
 descripcion: string;

 // Estado del mantenimiento: pendiente o completado
 @Column({
     type: 'enum',
     enum: ['pendiente', 'completado'],
 })
 estado: 'pendiente' | 'completado';

 // Nombre del técnico responsable
 @Column()
 tecnico: string;

 // Relación ManyToOne con la entidad Habitacion
 @ManyToOne(() => Habitacion, habitacion => habitacion.historial_mantenimiento)
 habitacion: Habitacion;
}
