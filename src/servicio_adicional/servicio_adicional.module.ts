import { Module } from '@nestjs/common';
import { ServicioAdicionalService } from './servicio_adicional.service';
import { ServicioAdicionalController } from './servicio_adicional.controller';
import { ServicioAdicional } from './entities/servicio_adicional.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ServicioAdicional],"austral")],
  controllers: [ServicioAdicionalController],
  providers: [ServicioAdicionalService],
})
export class ServicioAdicionalModule {}
