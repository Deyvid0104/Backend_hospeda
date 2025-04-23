import { PartialType } from '@nestjs/mapped-types';
import { CreateLogActividadDto } from './create-log_actividad.dto';

export class UpdateLogActividadDto extends PartialType(CreateLogActividadDto) {}
