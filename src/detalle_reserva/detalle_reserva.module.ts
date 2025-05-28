import { Module } from '@nestjs/common';
import { DetalleReservaService } from './detalle_reserva.service';
import { DetalleReservaController } from './detalle_reserva.controller';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionModule } from '../habitacion/habitacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleReserva], "austral"),
    HabitacionModule
  ],
  controllers: [DetalleReservaController],
  providers: [DetalleReservaService],
})
export class DetalleReservaModule {}
