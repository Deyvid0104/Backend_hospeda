import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { DetalleFacturaController } from './detalle_factura.controller';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DetalleFactura],"austral")],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
})
export class DetalleFacturaModule {}
