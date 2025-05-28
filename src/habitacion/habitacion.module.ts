import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionController } from './habitacion.controller';
import { Habitacion } from './entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Habitacion],'austral')],
  controllers: [HabitacionController],
  providers: [HabitacionService],
  exports: [TypeOrmModule],
})
export class HabitacionModule {}
