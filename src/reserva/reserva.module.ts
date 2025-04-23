import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Reserva],"austral")],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
