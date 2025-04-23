import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleFacturaDto } from './create-detalle_factura.dto';

export class UpdateDetalleFacturaDto extends PartialType(CreateDetalleFacturaDto) {}
