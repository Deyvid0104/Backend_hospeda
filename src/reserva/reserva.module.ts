import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { DetalleReserva } from '../detalle_reserva/entities/detalle_reserva.entity';
import { Habitacion } from '../habitacion/entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Reserva, DetalleReserva, Habitacion],
      "austral"
    )
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
