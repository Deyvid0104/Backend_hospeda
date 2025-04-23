import { IsString, IsDate, IsEnum, IsNumber } from 'class-validator';

export class CreateHistorialMantenimientoDto {
    // Identificador de la habitación asociada
    @IsNumber()
    id_habitacion: number;

    // Fecha de inicio del mantenimiento
    @IsDate()
    fecha_inicio: Date;

    // Fecha de fin del mantenimiento
    @IsDate()
    fecha_fin: Date;

    // Descripción detallada del mantenimiento
    @IsString()
    descripcion: string;

    // Estado del mantenimiento: pendiente o completado
    @IsEnum(['pendiente', 'completado'])
    estado: 'pendiente' | 'completado';

    // Nombre del técnico responsable
    @IsString()
    tecnico: string;
}
