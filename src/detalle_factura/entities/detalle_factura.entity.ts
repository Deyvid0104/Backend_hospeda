import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from 'src/factura/entities/factura.entity';
import { ServicioAdicional } from 'src/servicio_adicional/entities/servicio_adicional.entity';

@Entity()
export class DetalleFactura {
 // Identificador único del detalle de factura
 @PrimaryGeneratedColumn()
 id_detalle_factura: number;

 // Concepto o descripción del detalle
 @Column()
 concepto: string;

 // Cantidad del servicio o producto
 @Column()
 cantidad: number;

 // Precio unitario con hasta dos decimales
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 precio_unitario: number;

 // Relación ManyToOne con la entidad Factura
 @ManyToOne(() => Factura, factura => factura.detalles_factura)
 @JoinColumn({ name: 'id_factura' })
 factura: Factura;

 // Relación ManyToOne con la entidad ServicioAdicional
 @ManyToOne(() => ServicioAdicional, servicio => servicio.detalles_factura)
 @JoinColumn({ name: 'id_servicio' })
 servicio: ServicioAdicional;
}
