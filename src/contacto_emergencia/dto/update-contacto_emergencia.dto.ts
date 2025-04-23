import { PartialType } from '@nestjs/mapped-types';
import { CreateContactoEmergenciaDto } from './create-contacto_emergencia.dto';

export class UpdateContactoEmergenciaDto extends PartialType(CreateContactoEmergenciaDto) {}
