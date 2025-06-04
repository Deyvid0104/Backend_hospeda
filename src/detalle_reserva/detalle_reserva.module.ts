/**
 * Módulo DetalleReservaModule
 * Configura el módulo de detalle de reserva, incluyendo servicios, controladores y entidades.
 * Importa entidades relacionadas y exporta el servicio para uso en otros módulos.
 */

import { Module } from '@nestjs/common';
import { DetalleReservaService } from './detalle_reserva.service';
import { DetalleReservaController } from './detalle_reserva.controller';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleReserva, Reserva, Habitacion], "austral"),
  ],
  controllers: [DetalleReservaController],
  providers: [DetalleReservaService],
  exports: [DetalleReservaService],
})
export class DetalleReservaModule {}
