import { IsDate, IsEnum, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleReservaDto {
    @IsNumber()
    id_habitacion: number;

    @IsNumber()
    noches: number;

    @IsNumber()
    precio_aplicado: number;
}

export class CreateReservaDto {
    // Fecha de entrada de la reserva
    @IsDate()
    fecha_entrada: Date;

    // Fecha de salida de la reserva
    @IsDate()
    fecha_salida: Date;

    // Estado de la reserva: confirmada o cancelada
    @IsEnum(['confirmada', 'cancelada'])
    estado: 'confirmada' | 'cancelada';

    // Identificador del huésped asociado
    @IsNumber()
    id_huesped: number;

    // Detalles de la reserva (habitaciones)
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetalleReservaDto)
    detalles_reserva: DetalleReservaDto[];
}
