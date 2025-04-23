import { Module } from '@nestjs/common';
import { LogActividadService } from './log_actividad.service';
import { LogActividadController } from './log_actividad.controller';
import { LogActividad } from './entities/log_actividad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([LogActividad],"austral")],
  controllers: [LogActividadController],
  providers: [LogActividadService],
})
export class LogActividadModule {}
