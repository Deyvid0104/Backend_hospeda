import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Factura } from './entities/factura.entity';
import { DetalleFactura } from '../detalle_factura/entities/detalle_factura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleReserva } from '../detalle_reserva/entities/detalle_reserva.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Factura, DetalleFactura, DetalleReserva], 'austral')],
  controllers: [FacturaController],
  providers: [FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
