import { Module } from '@nestjs/common';
import { DetalleReservaService } from './detalle_reserva.service';
import { DetalleReservaController } from './detalle_reserva.controller';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DetalleReserva],"austral")],
  controllers: [DetalleReservaController],
  providers: [DetalleReservaService],
})
export class DetalleReservaModule {}
