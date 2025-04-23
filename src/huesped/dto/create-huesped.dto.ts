import { IsString, IsEmail, IsDate } from 'class-validator';

export class CreateHuespedDto {
    // Nombre del huésped
    @IsString()
    nombre: string;

    // Apellidos del huésped
    @IsString()
    apellidos: string;

    // Documento de identidad del huésped
    @IsString()
    documento_identidad: string;

    // Teléfono de contacto del huésped
    @IsString()
    telefono: string;

    // Correo electrónico del huésped
    @IsEmail()
    email: string;

    // Fecha de registro del huésped
    @IsDate()
    fecha_registro: Date;
}
