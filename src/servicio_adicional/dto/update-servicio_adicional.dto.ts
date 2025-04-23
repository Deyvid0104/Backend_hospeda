import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioAdicionalDto } from './create-servicio_adicional.dto';

export class UpdateServicioAdicionalDto extends PartialType(CreateServicioAdicionalDto) {}
