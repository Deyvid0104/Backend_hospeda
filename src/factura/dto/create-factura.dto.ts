import { IsNumber, IsEnum } from 'class-validator';

export class CreateFacturaDto {
 // Monto total de la factura con hasta dos decimales
 @IsNumber({ maxDecimalPlaces: 2 })
 monto_total: number;

 // Método de pago: efectivo, tarjeta o transferencia
 @IsEnum(['efectivo', 'tarjeta', 'transferencia'])
 metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia';

 // Estado de la factura: pendiente, pagada o anulada
 @IsEnum(['pendiente', 'pagada', 'anulada'])
 estado: 'pendiente' | 'pagada' | 'anulada';

 // Identificador de la reserva asociada
 id_reserva: number;
}
