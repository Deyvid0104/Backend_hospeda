import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFacturaService } from './detalle_factura.service';
import { DetalleFacturaController } from './detalle_factura.controller';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { Factura } from '../factura/entities/factura.entity';
import { ServicioAdicional } from '../servicio_adicional/entities/servicio_adicional.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleFactura, Factura, ServicioAdicional], 'austral'),
  ],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
  exports: [DetalleFacturaService],
})
export class DetalleFacturaModule {}
