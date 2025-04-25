import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { LogActividad } from 'src/log_actividad/entities/log_actividad.entity';
import { MinLength } from 'class-validator';

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
 @MinLength(5 , { message: 'La contraseña debe tener al menos 5 caracteres' })
 contraseña: string;

 // Correo electrónico único
 @Index({ unique: true })
 @Column()
 email: string;

 // Fecha y hora del último acceso, por defecto la fecha actual UTC
 @Column({ 
   type: 'timestamp', 
   default: () => 'CURRENT_TIMESTAMP',
   transformer: {
     to: (value: Date) => value,
     from: (value: Date) => {
       // Ajusta la fecha a la zona horaria de Madrid (UTC+1 o UTC+2 con horario de verano)
       const madridOffset = 60; // minutos de diferencia UTC+1
       const date = new Date(value);
       date.setMinutes(date.getMinutes() + madridOffset);
       return date;
     },
   },
 })
 ultimo_acceso: Date;

 // Relación OneToMany con la entidad LogActividad
 @OneToMany(() => LogActividad, log => log.usuario)
 logs: LogActividad[];
}
