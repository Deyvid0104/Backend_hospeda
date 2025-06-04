/**
 * Módulo ReservaModule
 * Configura el módulo de reserva, incluyendo servicios, controladores y entidades.
 * Importa entidades relacionadas y módulos dependientes.
 */

import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { DetalleReserva } from '../detalle_reserva/entities/detalle_reserva.entity';
import { Habitacion } from '../habitacion/entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleReservaModule } from '../detalle_reserva/detalle_reserva.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Reserva, DetalleReserva, Habitacion],
      "austral"
    ),
    DetalleReservaModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
