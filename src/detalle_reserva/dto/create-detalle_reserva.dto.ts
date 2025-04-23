import { IsNumber, IsDecimal } from 'class-validator';

export class CreateDetalleReservaDto {
    // Identificador de la reserva asociada
    @IsNumber()
    id_reserva: number;

    // Identificador de la habitación asociada
    @IsNumber()
    id_habitacion: number;

    // Número de noches reservadas
    @IsNumber()
    noches: number;

    // Precio aplicado para la reserva
    @IsDecimal()
    precio_aplicado: number;
}
