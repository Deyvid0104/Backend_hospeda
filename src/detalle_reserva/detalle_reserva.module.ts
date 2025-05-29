import { Module } from '@nestjs/common';
import { DetalleReservaService } from './detalle_reserva.service';
import { DetalleReservaController } from './detalle_reserva.controller';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionModule } from '../habitacion/habitacion.module';
import { Habitacion } from '../habitacion/entities/habitacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleReserva, Habitacion], "austral"),
    HabitacionModule
  ],
  controllers: [DetalleReservaController],
  providers: [DetalleReservaService],
})
export class DetalleReservaModule {}
