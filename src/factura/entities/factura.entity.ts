import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { DetalleFactura } from 'src/detalle_factura/entities/detalle_factura.entity';

@Entity()
export class Factura {
 // Identificador único de la factura
 @PrimaryGeneratedColumn()
 id_factura: number;

 // Monto total de la factura
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 monto_total: number;

 // Método de pago: efectivo, tarjeta o transferencia
 @Column({
     type: 'enum',
     enum: ['efectivo', 'tarjeta', 'transferencia'],
 })
 metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia';

 // Estado de la factura: pendiente, pagada o anulada
 @Column({
     type: 'enum',
     enum: ['pendiente', 'pagada', 'anulada'],
 })
 estado: 'pendiente' | 'pagada' | 'anulada';

 // Relación OneToOne con la entidad Reserva
 @OneToOne(() => Reserva, reserva => reserva.factura)
 @JoinColumn()
 reserva: Reserva;

 // Relación OneToMany con la entidad DetalleFactura
 @OneToMany(() => DetalleFactura, detalle => detalle.factura)
 detalles_factura: DetalleFactura[];
}
