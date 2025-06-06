import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { DetalleFactura } from 'src/detalle_factura/entities/detalle_factura.entity';

// Entidad que representa la tabla Factura en la base de datos
@Entity()
export class Factura {
 // Identificador único de la factura (clave primaria)
 @PrimaryGeneratedColumn()
 id_factura: number;

 // Monto total de la factura con precisión decimal
 @Column({ type: 'decimal', precision: 10, scale: 2 })
 monto_total: number;

 // Descuento aplicado a la factura, valor decimal, por defecto 0
 @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
 descuento: number;

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

 // Relación OneToOne con la entidad Reserva (una factura está asociada a una reserva)
  @OneToOne(() => Reserva, reserva => reserva.factura)
  @JoinColumn({ name: 'id_reserva' })
  reserva: Reserva;

 // Relación OneToMany con la entidad DetalleFactura (una factura puede tener varios detalles)
 @OneToMany(() => DetalleFactura, detalle => detalle.factura)
 detalles_factura: DetalleFactura[];
}
