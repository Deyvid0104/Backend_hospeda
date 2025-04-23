import { IsString, IsDecimal, IsBoolean } from 'class-validator';

export class CreateServicioAdicionalDto {
 // Nombre del servicio adicional
 @IsString()
 nombre: string;

 // Precio del servicio adicional
 @IsDecimal()
 precio: number;

 // Indica si el servicio está disponible
 @IsBoolean()
 disponible: boolean;
}
