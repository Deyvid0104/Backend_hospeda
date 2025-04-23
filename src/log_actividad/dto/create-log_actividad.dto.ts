import { IsString, IsNumber } from 'class-validator';

export class CreateLogActividadDto {
    @IsNumber()
    id_usuario: number;

    @IsString()
    accion: string;

    @IsString()
    modulo: string;

    @IsString()
    ip_acceso: string;
}