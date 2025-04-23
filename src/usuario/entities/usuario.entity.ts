import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LogActividad } from 'src/log_actividad/entities/log_actividad.entity';

@Entity()
export class Usuario {
 // Identificador único del usuario
 @PrimaryGeneratedColumn()
 id_usuario: number;

 // Nombre de usuario
 @Column()
 nombre_usuario: string;

 // Rol del usuario: admin o recepcionista
 @Column({
     type: 'enum',
     enum: ['admin', 'recepcionista'],
 })
 rol: 'admin' | 'recepcionista';

 // Contraseña en hash
 @Column()
 contraseña_hash: string;

 // Correo electrónico
 @Column()
 email: string;

 // Fecha y hora del último acceso
 @Column()
 ultimo_acceso: Date;

 // Relación OneToMany con la entidad LogActividad
 @OneToMany(() => LogActividad, log => log.usuario)
 logs: LogActividad[];
}
