import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class LogActividad {
    // Identificador único del log de actividad
    @PrimaryGeneratedColumn()
    id_log: number;

    // Identificador del usuario asociado
    @Column()
    id_usuario: number;

    // Acción realizada
    @Column()
    accion: string;

    // Módulo donde se realizó la acción
    @Column()
    modulo: string;

    // Fecha y hora de la acción
    @Column()
    fecha_hora: Date;

    // Dirección IP desde donde se accedió
    @Column()
    ip_acceso: string;

    // Relación ManyToOne con la entidad Usuario
    @ManyToOne(() => Usuario, usuario => usuario.logs)
    usuario: Usuario;
}
