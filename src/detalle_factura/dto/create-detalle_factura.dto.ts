import { IsNumber, IsString, IsDecimal } from 'class-validator';

export class CreateDetalleFacturaDto {
    // Identificador de la factura asociada
    @IsNumber()
    id_factura: number;

    // Identificador del servicio adicional
    @IsNumber()
    id_servicio: number;

    // Concepto o descripción del detalle
    @IsString()
    concepto: string;

    // Cantidad del servicio o producto
    @IsNumber()
    cantidad: number;

    // Precio unitario con hasta dos decimales
    @IsDecimal()
    precio_unitario: number;
}
