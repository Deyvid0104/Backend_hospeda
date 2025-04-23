import { Module } from '@nestjs/common';
import { HistorialMantenimientoService } from './historial_mantenimiento.service';
import { HistorialMantenimientoController } from './historial_mantenimiento.controller';
import { HistorialMantenimiento } from './entities/historial_mantenimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([HistorialMantenimiento],"austral")],
  controllers: [HistorialMantenimientoController],
  providers: [HistorialMantenimientoService],
})
export class HistorialMantenimientoModule {}
