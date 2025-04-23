import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DetalleFactura } from 'src/detalle_factura/entities/detalle_factura.entity';

@Entity()
export class ServicioAdicional {
 // Identificador único del servicio adicional
 @PrimaryGeneratedColumn()
 id_servicio: number;

 // Nombre del servicio adicional
 @Column()
 nombre: string;

 // Precio del servicio adicional
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 precio: number;

 // Indica si el servicio está disponible
 @Column()
 disponible: boolean;

 // Relación OneToMany con la entidad DetalleFactura
 @OneToMany(() => DetalleFactura, detalle => detalle.servicio)
 detalles_factura: DetalleFactura[];
}
