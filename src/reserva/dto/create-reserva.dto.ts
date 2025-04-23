import { IsDate, IsEnum, IsNumber } from 'class-validator';

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
}
