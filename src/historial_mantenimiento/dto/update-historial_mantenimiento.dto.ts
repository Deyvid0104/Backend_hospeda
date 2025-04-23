import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialMantenimientoDto } from './create-historial_mantenimiento.dto';

export class UpdateHistorialMantenimientoDto extends PartialType(CreateHistorialMantenimientoDto) {}
