import { IsString, IsNumber } from 'class-validator';

export class CreateContactoEmergenciaDto {
    // Identificador del huésped asociado
    @IsNumber()
    id_huesped: number;

    // Nombre completo del contacto de emergencia
    @IsString()
    nombre: string;

    // Número de teléfono del contacto
    @IsString()
    telefono: string;

    // Parentesco con el huésped
    @IsString()
    parentesco: string;
}
