import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class LogActividad {
    // Identificador único del log de actividad
    @PrimaryGeneratedColumn()
    id_log: number;

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
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}
